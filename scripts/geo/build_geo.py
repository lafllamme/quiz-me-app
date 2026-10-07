"""Builds the silhouette shapes and pin maps for visual questions from Natural Earth data.

Natural Earth is public domain. Download the GeoJSON files listed in SOURCES into one
directory and pass it as the first argument:

    python3 scripts/geo/build_geo.py /tmp/ne-data

Writes app/data/geo/shapes.ts and app/data/geo/maps.ts.
"""
import json
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'app' / 'data' / 'geo'

SOURCES = {
    'countries50': 'ne_50m_admin_0_countries.geojson',
    'countries110': 'ne_110m_admin_0_countries.geojson',
    'states': 'ne_10m_admin_1_states_provinces.geojson',
    'rivers': 'ne_10m_rivers_lake_centerlines.geojson',
}

# Countries that make a recognisable silhouette, keyed by ADM0_A3.
COUNTRIES = '''
DEU FRA ITA ESP PRT GBR IRL ISL NOR SWE FIN DNK NLD BEL LUX CHE AUT POL CZE SVK HUN HRV
SVN GRC TUR CYP UKR RUS USA CAN MEX CUB JAM BRA ARG CHL PER COL VEN AUS NZL JPN CHN
IND LKA KOR VNM THA PHL IDN MDG EGY MAR TUN ZAF NAM SOM ETH KEN NGA SAU ARE ISR IRN IRQ
AFG PAK MNG KAZ GRL BGR ROU SRB ALB EST LVA LTU BLR GEO PAN CRI ECU BOL URY KHM LAO
MMR NPL BTN MYS TWN DZA LBY TZA AGO MOZ ZMB ZWE BWA
'''.split()

# German federal states, keyed by ISO 3166-2 code.
STATES = {
    'DE-BW': 'Baden-Württemberg', 'DE-BY': 'Bayern', 'DE-BE': 'Berlin', 'DE-BB': 'Brandenburg',
    'DE-HH': 'Hamburg', 'DE-HE': 'Hessen', 'DE-MV': 'Mecklenburg-Vorpommern',
    'DE-NI': 'Niedersachsen', 'DE-NW': 'Nordrhein-Westfalen', 'DE-RP': 'Rheinland-Pfalz',
    'DE-SL': 'Saarland', 'DE-SN': 'Sachsen', 'DE-ST': 'Sachsen-Anhalt', 'DE-SH': 'Schleswig-Holstein',
    'DE-TH': 'Thüringen',
}

RIVERS = {'Rhine', 'Rhein', 'Elbe', 'Danube', 'Donau', 'Main', 'Weser', 'Mosel', 'Oder'}

# Map frames for pin questions: west, east, south, north and output width.
MAPS = {
    'germany': {'bounds': (2.0, 19.0, 46.9, 55.3), 'width': 800},
    'europe': {'bounds': (-12.0, 42.0, 34.0, 71.0), 'width': 1000},
    'world': {'bounds': (-170.0, 190.0, -56.0, 76.0), 'width': 1000},
}


def merc_y(lat):
    return math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


def polygons(geometry):
    if geometry['type'] == 'Polygon':
        return [geometry['coordinates']]
    if geometry['type'] == 'MultiPolygon':
        return geometry['coordinates']
    return []


def lines(geometry):
    if geometry['type'] == 'LineString':
        return [geometry['coordinates']]
    if geometry['type'] == 'MultiLineString':
        return geometry['coordinates']
    return []


def simplify(points, tolerance):
    """Douglas-Peucker on projected points. Closed rings are split at their farthest point first."""
    if len(points) < 3:
        return points
    if points[0] == points[-1]:
        ring = points[:-1]
        x0, y0 = ring[0]
        far = max(range(len(ring)), key=lambda i: (ring[i][0] - x0) ** 2 + (ring[i][1] - y0) ** 2)
        return simplify(ring[:far + 1], tolerance)[:-1] + simplify(ring[far:] + ring[:1], tolerance)[:-1]
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        start, end = stack.pop()
        (ax, ay), (bx, by) = points[start], points[end]
        dx, dy = bx - ax, by - ay
        length = math.hypot(dx, dy) or 1e-9
        best, index = 0.0, None
        for i in range(start + 1, end):
            px, py = points[i]
            distance = abs(dy * px - dx * py + bx * ay - by * ax) / length
            if distance > best:
                best, index = distance, i
        if index is not None and best > tolerance:
            keep[index] = True
            stack += [(start, index), (index, end)]
    return [p for p, k in zip(points, keep) if k]


def ring_area(points):
    return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(points, points[1:] + points[:1]))) / 2


def fmt(value):
    text = f'{value:.1f}'
    return text[:-2] if text.endswith('.0') else text


def to_path(rings, closed=True):
    parts = []
    for ring in rings:
        if len(ring) < (3 if closed else 2):
            continue
        parts.append('M' + 'L'.join(f'{fmt(x)} {fmt(y)}' for x, y in ring) + ('Z' if closed else ''))
    return ''.join(parts)


def unwrap(polys):
    """Shifts far-western parts east when a shape crosses the antimeridian (Russia, Fiji)."""
    lons = [lon for poly in polys for lon, _ in poly[0]]
    if min(lons) < -170 and max(lons) > 170:
        return [[[(lon + 360 if lon < 0 else lon, lat) for lon, lat in ring] for ring in poly] for poly in polys]
    return polys


def shape(polys, size=100, tolerance=0.35):
    """Projects one country/state into a size×size box, dropping far-flung islands and specks."""
    polys = unwrap(polys)
    projected = [[[(math.radians(lon), -merc_y(lat)) for lon, lat in ring] for ring in poly] for poly in polys]
    areas = [ring_area(poly[0]) for poly in projected]
    main = projected[areas.index(max(areas))][0]
    # Keep islands near the main landmass (Sicily, Hokkaido) and drop far territories (Azores, Alaska).
    left, right = min(x for x, _ in main), max(x for x, _ in main)
    top, bottom = min(y for _, y in main), max(y for _, y in main)
    margin = max(right - left, bottom - top) * 0.35

    def near(ring):
        cx = sum(x for x, _ in ring) / len(ring)
        cy = sum(y for _, y in ring) / len(ring)
        return left - margin <= cx <= right + margin and top - margin <= cy <= bottom + margin

    kept = [poly for poly, area in zip(projected, areas) if area >= max(areas) * 0.004 and near(poly[0])]
    xs = [x for poly in kept for x, _ in poly[0]]
    ys = [y for poly in kept for _, y in poly[0]]
    x0, y0 = min(xs), min(ys)
    scale = size / max(max(xs) - x0, max(ys) - y0)
    width, height = (max(xs) - x0) * scale, (max(ys) - y0) * scale
    rings = [simplify([((x - x0) * scale, (y - y0) * scale) for x, y in ring], tolerance) for poly in kept for ring in poly]
    rings = [ring for ring in rings if len(ring) >= 4 and ring_area(ring) > 0.4]
    pad = 2
    return {'viewBox': f'{-pad} {-pad} {fmt(width + 2 * pad)} {fmt(height + 2 * pad)}', 'path': to_path(rings)}


class Frame:
    def __init__(self, bounds, width):
        self.west, self.east, self.south, self.north = bounds
        self.width = width
        span = math.radians(self.east - self.west)
        self.height = width * (merc_y(self.north) - merc_y(self.south)) / span

    def project(self, lon, lat):
        lat = max(min(lat, 85), -85)
        x = (lon - self.west) / (self.east - self.west) * self.width
        y = (merc_y(self.north) - merc_y(lat)) / (merc_y(self.north) - merc_y(self.south)) * self.height
        return x, y

    def visible(self, coords):
        lons = [c[0] for c in coords]
        lats = [c[1] for c in coords]
        return max(lons) >= self.west and min(lons) <= self.east and max(lats) >= self.south and min(lats) <= self.north


def map_layer(frame, features, tolerance, closed=True, shift=False):
    paths = []
    for feature in features:
        geometry = feature['geometry']
        if not geometry:
            continue
        groups = polygons(geometry) if closed else [[line] for line in lines(geometry)]
        rings = []
        for group in groups:
            for ring in group:
                variants = [ring]
                if shift:
                    variants.append([(lon + 360, lat) for lon, lat in ring])
                for variant in variants:
                    if not frame.visible(variant):
                        continue
                    points = simplify([frame.project(lon, lat) for lon, lat in variant], tolerance)
                    if closed and (len(points) < 4 or ring_area(points) < tolerance * tolerance * 2):
                        continue
                    rings.append(points)
        path = to_path(rings, closed)
        if path:
            paths.append(path)
    return paths


def ts_string(value):
    return "'" + value.replace('\\', '\\\\').replace("'", "\\'") + "'"


def main():
    source = Path(sys.argv[1])
    data = {key: json.loads((source / name).read_text()) for key, name in SOURCES.items()}
    countries = {f['properties']['ADM0_A3']: f for f in data['countries50']['features']}
    states = {f['properties']['iso_3166_2']: f for f in data['states']['features'] if f['properties']['adm0_a3'] == 'DEU'}

    shapes = {}
    for code in COUNTRIES:
        feature = countries[code]
        shapes[code] = {'name': feature['properties']['NAME_DE'], **shape(polygons(feature['geometry']))}
    for code, name in STATES.items():
        shapes[code] = {'name': name, **shape(polygons(states[code]['geometry']))}

    OUT.mkdir(parents=True, exist_ok=True)
    lines_out = [
        '// Generated by scripts/geo/build_geo.py from Natural Earth (public domain). Do not edit.',
        '',
        'export interface GeoShape {',
        '  name: string',
        '  viewBox: string',
        '  path: string',
        '}',
        '',
        'export const GEO_SHAPES = {',
    ]
    for code, item in shapes.items():
        key = code if code.isidentifier() else ts_string(code)
        lines_out.append(f"  {key}: {{ name: {ts_string(item['name'])}, viewBox: {ts_string(item['viewBox'])}, path: {ts_string(item['path'])} }},")
    lines_out += ['} as const satisfies Record<string, GeoShape>', '', 'export type GeoShapeId = keyof typeof GEO_SHAPES', '']
    (OUT / 'shapes.ts').write_text('\n'.join(lines_out))

    maps = {}
    europe_world = [f for f in data['countries50']['features'] if f['properties']['ADM0_A3'] != 'ATA']
    for name, config in MAPS.items():
        frame = Frame(config['bounds'], config['width'])
        if name == 'germany':
            neighbours = [f for f in europe_world if f['properties']['ADM0_A3'] != 'DEU']
            layers = {
                'land': map_layer(frame, neighbours, 0.8),
                'focus': map_layer(frame, list(states.values()), 0.6),
                'rivers': map_layer(frame, [f for f in data['rivers']['features'] if f['properties']['name'] in RIVERS], 0.8, closed=False),
            }
        elif name == 'europe':
            layers = {'land': map_layer(frame, europe_world, 1.0), 'focus': [], 'rivers': []}
        else:
            world = [f for f in data['countries110']['features'] if f['properties']['ADM0_A3'] != 'ATA']
            layers = {'land': map_layer(frame, world, 1.2, shift=True), 'focus': [], 'rivers': []}
        maps[name] = {'bounds': config['bounds'], 'width': round(frame.width), 'height': round(frame.height), **layers}

    lines_out = [
        '// Generated by scripts/geo/build_geo.py from Natural Earth (public domain). Do not edit.',
        '',
        'export interface GeoMap {',
        '  /** West, east, south, north in degrees; the frame uses a Mercator projection. */',
        '  bounds: readonly [number, number, number, number]',
        '  width: number',
        '  height: number',
        '  /** Context land, one path per country. */',
        '  land: readonly string[]',
        '  /** Highlighted area with inner borders (German states on the Germany map). */',
        '  focus: readonly string[]',
        '  rivers: readonly string[]',
        '}',
        '',
        'export const GEO_MAPS = {',
    ]
    for name, item in maps.items():
        lines_out.append(f'  {name}: {{')
        lines_out.append(f"    bounds: [{', '.join(str(b) for b in item['bounds'])}],")
        lines_out.append(f"    width: {item['width']},")
        lines_out.append(f"    height: {item['height']},")
        for layer in ('land', 'focus', 'rivers'):
            lines_out.append(f'    {layer}: [')
            lines_out += [f'      {ts_string(path)},' for path in item[layer]]
            lines_out.append('    ],')
        lines_out.append('  },')
    lines_out += ['} as const satisfies Record<string, GeoMap>', '', 'export type GeoMapId = keyof typeof GEO_MAPS', '']
    (OUT / 'maps.ts').write_text('\n'.join(lines_out))


if __name__ == '__main__':
    main()
