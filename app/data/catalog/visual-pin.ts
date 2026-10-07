import { v, type QuestionSeed } from './seed'

// Pins on the generated maps in app/data/geo/maps.ts; coordinates are [lon, lat].
const koeln = { label: 'Köln', at: [6.96, 50.94] } as const

export const pinQuestions: readonly QuestionSeed[] = [
  // Germany map – NRW & Rheinland
  v('pin-cologne-01', 'cologne', 1, 'Welche Stadt liegt hier, gleich neben Köln?', 'Düsseldorf', ['Düsseldorf', 'Bonn', 'Leverkusen', 'Wuppertal'], { kind: 'pin', map: 'germany', at: [6.77, 51.23], reference: koeln }, ['local']),
  v('pin-cologne-02', 'cologne', 2, 'Welche Stadt ganz im Westen ist das?', 'Aachen', ['Aachen', 'Mönchengladbach', 'Düren', 'Krefeld'], { kind: 'pin', map: 'germany', at: [6.08, 50.78], reference: koeln }, ['local']),
  v('pin-cologne-03', 'cologne', 2, 'Welche Stadt ist hier markiert?', 'Münster', ['Münster', 'Bielefeld', 'Dortmund', 'Osnabrück'], { kind: 'pin', map: 'germany', at: [7.63, 51.96] }, ['local']),
  v('pin-cologne-04', 'cologne', 3, 'Wo Rhein und Mosel sich treffen: welche Stadt?', 'Koblenz', ['Koblenz', 'Mainz', 'Trier', 'Bonn'], { kind: 'pin', map: 'germany', at: [7.59, 50.36] }, ['local']),

  // Germany map – rest of the country
  v('pin-world-01', 'world', 1, 'Welche Stadt liegt hier?', 'Hamburg', ['Hamburg', 'Bremen', 'Hannover', 'Kiel'], { kind: 'pin', map: 'germany', at: [9.99, 53.55] }, ['classic']),
  v('pin-world-02', 'world', 1, 'Welche Stadt ist das?', 'München', ['München', 'Nürnberg', 'Augsburg', 'Stuttgart'], { kind: 'pin', map: 'germany', at: [11.58, 48.14] }, ['classic']),
  v('pin-world-03', 'world', 2, 'Welche Stadt am Main ist markiert?', 'Frankfurt am Main', ['Frankfurt am Main', 'Würzburg', 'Mainz', 'Kassel'], { kind: 'pin', map: 'germany', at: [8.68, 50.11], reference: koeln }, ['classic']),
  v('pin-world-04', 'world', 2, 'Welche Hafenstadt ist das?', 'Rostock', ['Rostock', 'Kiel', 'Lübeck', 'Stralsund'], { kind: 'pin', map: 'germany', at: [12.10, 54.09] }, ['classic']),
  v('pin-world-05', 'world', 3, 'Welche Stadt im Osten ist das?', 'Leipzig', ['Leipzig', 'Halle', 'Dresden', 'Erfurt'], { kind: 'pin', map: 'germany', at: [12.37, 51.34] }, ['classic']),
  v('pin-world-06', 'world', 3, 'Welche Stadt an der Donau liegt hier?', 'Passau', ['Passau', 'Regensburg', 'Ingolstadt', 'Ulm'], { kind: 'pin', map: 'germany', at: [13.46, 48.57] }, ['odd']),

  // Europe map
  v('pin-world-07', 'world', 1, 'Welche Stadt am Atlantik ist das?', 'Lissabon', ['Lissabon', 'Madrid', 'Porto', 'Sevilla'], { kind: 'pin', map: 'europe', at: [-9.14, 38.72] }, ['classic']),
  v('pin-world-08', 'world', 1, 'Welche Urlaubsstadt liegt hier?', 'Barcelona', ['Barcelona', 'Valencia', 'Marseille', 'Madrid'], { kind: 'pin', map: 'europe', at: [2.17, 41.39] }, ['classic']),
  v('pin-world-09', 'world', 1, 'Welche Stadt im Süden ist das?', 'Athen', ['Athen', 'Thessaloniki', 'Sofia', 'Istanbul'], { kind: 'pin', map: 'europe', at: [23.73, 37.98] }, ['classic']),
  v('pin-world-10', 'world', 2, 'Welche Urlaubsinsel ist hier markiert?', 'Mallorca', ['Mallorca', 'Ibiza', 'Korsika', 'Sardinien'], { kind: 'pin', map: 'europe', at: [2.95, 39.62] }, ['classic', 'chat']),
  v('pin-world-11', 'world', 2, 'Welche Hauptstadt im Norden ist das?', 'Oslo', ['Oslo', 'Stockholm', 'Kopenhagen', 'Helsinki'], { kind: 'pin', map: 'europe', at: [10.75, 59.91] }, ['classic']),
  v('pin-world-12', 'world', 2, 'Welche Hauptstadt an der Donau ist das?', 'Budapest', ['Budapest', 'Wien', 'Bratislava', 'Belgrad'], { kind: 'pin', map: 'europe', at: [19.04, 47.50] }, ['classic']),
  v('pin-world-13', 'world', 3, 'Welche Stadt ist hier markiert?', 'Istanbul', ['Istanbul', 'Ankara', 'Sofia', 'Bukarest'], { kind: 'pin', map: 'europe', at: [28.98, 41.01] }, ['odd']),
  v('pin-world-14', 'world', 3, 'Welche Stadt auf dem Balkan ist das?', 'Dubrovnik', ['Dubrovnik', 'Split', 'Podgorica', 'Sarajevo'], { kind: 'pin', map: 'europe', at: [18.09, 42.65] }, ['odd']),

  // World map – only big, well-separated targets
  v('pin-world-15', 'world', 1, 'Welche Metropole liegt hier?', 'New York', ['New York', 'Chicago', 'Miami', 'Toronto'], { kind: 'pin', map: 'world', at: [-74.01, 40.71] }, ['classic']),
  v('pin-world-16', 'world', 1, 'Welche Stadt down under ist das?', 'Sydney', ['Sydney', 'Perth', 'Melbourne', 'Brisbane'], { kind: 'pin', map: 'world', at: [151.21, -33.87] }, ['classic']),
  v('pin-world-17', 'world', 1, 'Welche Stadt liegt hier ganz im Süden?', 'Kapstadt', ['Kapstadt', 'Johannesburg', 'Nairobi', 'Lagos'], { kind: 'pin', map: 'world', at: [18.42, -33.92] }, ['classic']),
  v('pin-world-18', 'world', 2, 'Welche Stadt ist hier markiert?', 'Rio de Janeiro', ['Rio de Janeiro', 'Buenos Aires', 'Lima', 'Salvador'], { kind: 'pin', map: 'world', at: [-43.17, -22.91] }, ['classic']),
  v('pin-world-19', 'world', 2, 'Welche Riesenstadt liegt hier?', 'Tokio', ['Tokio', 'Seoul', 'Peking', 'Shanghai'], { kind: 'pin', map: 'world', at: [139.69, 35.69] }, ['classic']),
  v('pin-world-20', 'world', 3, 'Welche Millionenstadt ist das?', 'Mumbai', ['Mumbai', 'Delhi', 'Kalkutta', 'Karatschi'], { kind: 'pin', map: 'world', at: [72.88, 19.08] }, ['odd']),
  v('pin-world-21', 'world', 3, 'Welche Stadt mitten im Pazifik ist das?', 'Honolulu', ['Honolulu', 'Papeete', 'Suva', 'Anchorage'], { kind: 'pin', map: 'world', at: [-157.86, 21.31] }, ['odd']),
  v('pin-world-22', 'world', 3, 'Welche Wüstenmetropole ist das?', 'Dubai', ['Dubai', 'Doha', 'Riad', 'Maskat'], { kind: 'pin', map: 'world', at: [55.27, 25.20] }, ['current']),
]
