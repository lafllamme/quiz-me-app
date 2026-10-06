"""Builds the Kopf portrait relief for the toss coin.

Usage:
  swift segment.swift photo.png mask.png
  python3 relief.py photo.png mask.png ../../public/coin/kopf-relief.png

Crop box, neck cut, glasses geometry and the hair region are measured on the
original profile photo (1920x1080, facing left). A different photo needs new
measurements. Output: grey levels are height, alpha is the silhouette.
"""
import math
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

SS = 4  # supersampling for the vector glasses
src = Image.open(sys.argv[1]).convert('L')
mask = Image.open(sys.argv[2]).convert('L')
box = (820, 50, 1660, 890)
g = src.crop(box)
m = mask.crop(box).point(lambda v: 255 if v > 128 else 0)
W = g.size[0]
cut = Image.new('L', g.size, 255)
ImageDraw.Draw(cut).polygon([(0, 760), (W, 700), (W, W), (0, W)], fill=0)
m = ImageChops.multiply(m, cut).filter(ImageFilter.MedianFilter(9))

dome = m.filter(ImageFilter.GaussianBlur(40))
dome = ImageOps.autocontrast(ImageChops.multiply(dome, m))
smooth = g.filter(ImageFilter.GaussianBlur(2.4))
low = g.filter(ImageFilter.GaussianBlur(12))
detail = ImageOps.autocontrast(ImageChops.subtract(smooth, low, 1, 128), cutoff=1.5)

# Glasses as authored geometry, measured from the photo (crop coordinates).
gl = Image.new('L', (W * SS, W * SS), 0)
d = ImageDraw.Draw(gl)
def ellipse(cx, cy, rx, ry, tilt, start=0, end=360, width=8):
    pts = []
    for i in range(0, 361):
        a = math.radians(start + (end - start) * i / 360)
        x, y = rx * math.cos(a), ry * math.sin(a)
        t = math.radians(tilt)
        pts.append(((cx + x * math.cos(t) - y * math.sin(t)) * SS, (cy + x * math.sin(t) + y * math.cos(t)) * SS))
    d.line(pts, fill=255, width=width * SS, joint='curve')
ellipse(176, 339, 22, 63, 8, width=8)             # near lens rim
ellipse(138, 337, 13, 36, 6, 90, 270, width=6)     # far lens, left half visible
d.line([(197 * SS, 286 * SS), (330 * SS, 300 * SS), (470 * SS, 318 * SS)], fill=255, width=9 * SS, joint='curve')  # temple arm
gl = gl.resize((W, W), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.6))
gl = ImageChops.multiply(gl, m)

# Hair: authored region behind the hairline, around the ear, filled with
# combed strokes the way coin engravers render hair.
hair = Image.new('L', g.size, 0)
ImageDraw.Draw(hair).polygon([(400, 0), (840, 0), (840, 640), (640, 640), (600, 560), (560, 510), (565, 360), (520, 330), (475, 345), (460, 280), (430, 160), (395, 60)], fill=255)
hair = ImageChops.multiply(hair, m).filter(ImageFilter.GaussianBlur(22))
strokes = Image.new('L', (W * SS, W * SS), 0)
sd = ImageDraw.Draw(strokes)
# Combed strands curve around the ear, like hair on a coin portrait.
ex, ey = 515, 425
for k, r in enumerate(range(70, 560, 8)):
    pts = []
    for step in range(0, 121):
        a = math.radians(-150 + step * 1.6)
        rr = r + 4 * math.sin(step / 7 + k * 1.3)
        pts.append(((ex + rr * math.cos(a)) * SS, (ey + rr * math.sin(a)) * SS))
    sd.line(pts, fill=255, width=3 * SS, joint='curve')
strokes = strokes.resize((W, W), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.8))
hair_relief = ImageChops.multiply(strokes, hair).point(lambda v: v * 0.17)

height = Image.blend(dome, detail, 0.4)
height = ImageChops.add(height, hair_relief)
# Lenses sit flat over the eye: soften detail inside the near lens a little.
height = ImageChops.lighter(height, gl.point(lambda v: min(255, v * 1.15)))
height = ImageChops.multiply(height, m)
# Lift the relief above the coin field: the silhouette edge starts at 110 so
# the portrait never reads as sunken.
lifted = ImageChops.multiply(height.point(lambda v: 110 + v * 145 // 255), m)
Image.merge('LA', (lifted, m)).resize((768, 768), Image.LANCZOS).save(sys.argv[3])
prev = height.filter(ImageFilter.GaussianBlur(1.0)).filter(ImageFilter.EMBOSS)
gold = ImageOps.colorize(prev, (90, 60, 15), (250, 225, 160))
bg = Image.new('RGB', g.size, (200, 165, 90)); bg.paste(gold, (0, 0), m)
bg.resize((560, 560)).save('preview.png')  # quick emboss check
