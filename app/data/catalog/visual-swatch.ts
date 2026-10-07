import { v, type QuestionSeed } from './seed'

export const swatchQuestions: readonly QuestionSeed[] = [
  // knowledge
  v('swatch-knowledge-01', 'knowledge', 1, 'Welches ist das echte Barbie-Pink?', '#E0218A', ['#E0218A', '#F2A0C8', '#E02150', '#B321E0'], { kind: 'swatch', reveal: 'Barbie-Pink' }, ['classic']),
  v('swatch-knowledge-02', 'knowledge', 2, 'Welches ist das echte Tiffany-Blau?', '#0ABAB5', ['#0ABAB5', '#0A7BBA', '#0ABA6E', '#7FDCD9'], { kind: 'swatch', reveal: 'Tiffany-Blau' }, ['classic']),
  v('swatch-knowledge-03', 'knowledge', 2, 'Welches ist das klassische Ferrari-Rot?', '#D40000', ['#D40000', '#F05A14', '#B0003A', '#7A0000'], { kind: 'swatch', reveal: 'Rosso Corsa' }, ['classic']),
  v('swatch-knowledge-04', 'knowledge', 3, 'Welches ist Yves Kleins berühmtes Blau?', '#002FA7', ['#002FA7', '#0080B0', '#3A00A7', '#4D7BE8'], { kind: 'swatch', reveal: 'Yves-Klein-Blau' }, ['odd']),

  // internet
  v('swatch-internet-01', 'internet', 1, 'Welches ist das echte Snapchat-Gelb?', '#FFFC00', ['#FFFC00', '#FFB800', '#B4FF00', '#FFF59A'], { kind: 'swatch', reveal: 'Snapchat-Gelb' }, ['current']),
  v('swatch-internet-02', 'internet', 2, 'Welches ist das echte WhatsApp-Grün?', '#25D366', ['#25D366', '#25D3A8', '#6CD325', '#0F6E35'], { kind: 'swatch', reveal: 'WhatsApp-Grün' }, ['chat']),
  v('swatch-internet-03', 'internet', 2, 'Welches ist das echte Twitch-Lila?', '#9146FF', ['#9146FF', '#4F5BFF', '#E046F0', '#C4A8FF'], { kind: 'swatch', reveal: 'Twitch-Lila' }, ['current']),
  v('swatch-internet-04', 'internet', 3, 'Welches ist das echte Spotify-Grün?', '#1DB954', ['#1DB954', '#1DB9A0', '#8CB91D', '#0E6B30'], { kind: 'swatch', reveal: 'Spotify-Grün' }, ['current']),

  // nostalgia
  v('swatch-nostalgia-01', 'nostalgia', 1, 'Welche Farbe hat der Pac-Man-Geist Clyde?', '#FFB852', ['#FFB852', '#FF0000', '#FFB8FF', '#00FFFF'], { kind: 'swatch', reveal: 'Clyde-Orange' }, ['nostalgia']),
  v('swatch-nostalgia-02', 'nostalgia', 2, 'Welches Blau hatte der Twitter-Vogel?', '#1DA1F2', ['#1DA1F2', '#2D46F0', '#1DD9C4', '#9FD8FA'], { kind: 'swatch', reveal: 'Twitter-Blau' }, ['nostalgia']),
  v('swatch-nostalgia-03', 'nostalgia', 3, 'Welches Blau hatte Facebook um 2010?', '#3B5998', ['#3B5998', '#1877F2', '#3B8C98', '#5B3B98'], { kind: 'swatch', reveal: 'Facebook-Blau (alt)' }, ['nostalgia']),

  // cologne
  v('swatch-cologne-01', 'cologne', 1, 'Welches ist das echte Telekom-Magenta?', '#E20074', ['#E20074', '#E8002A', '#A800E2', '#FF8FC8'], { kind: 'swatch', reveal: 'Telekom-Magenta' }, ['local']),
  v('swatch-cologne-02', 'cologne', 2, 'Welches ist das echte Deutsche-Post-Gelb?', '#FFCC00', ['#FFCC00', '#FA7F00', '#D9F000', '#FFE98A'], { kind: 'swatch', reveal: 'Post-Gelb' }, ['local']),
  v('swatch-cologne-03', 'cologne', 3, 'Welches ist das echte Deutsche-Bahn-Rot?', '#EC0016', ['#EC0016', '#FF5A1F', '#C0004E', '#8F0A12'], { kind: 'swatch', reveal: 'DB-Rot' }, ['local']),

  // brands
  v('swatch-brands-01', 'brands', 1, 'Welches ist das echte Milka-Lila?', '#7D69AC', ['#7D69AC', '#B05FB0', '#4A3A8C', '#6F8FD8'], { kind: 'swatch', reveal: 'Milka-Lila' }, ['classic']),
  v('swatch-brands-02', 'brands', 2, 'Welches ist das echte IKEA-Blau?', '#0058A3', ['#0058A3', '#00A0DC', '#1C2B6E', '#4B3FA8'], { kind: 'swatch', reveal: 'IKEA-Blau' }, ['classic']),
  v('swatch-brands-03', 'brands', 2, 'Welches ist das echte Starbucks-Grün?', '#00704A', ['#00704A', '#00A878', '#5E8C2A', '#0B3D33'], { kind: 'swatch', reveal: 'Starbucks-Grün' }, ['classic']),
  v('swatch-brands-04', 'brands', 3, 'Welches ist das echte Coca-Cola-Rot?', '#F40009', ['#F40009', '#FF5A1F', '#B8102E', '#E0006E'], { kind: 'swatch', reveal: 'Coca-Cola-Rot' }, ['classic']),

  // world: flag colours
  v('swatch-world-01', 'world', 1, 'Welches Blau hat die Flagge Griechenlands?', '#0D5EAF', ['#0D5EAF', '#75AADB', '#012169', '#0093C8'], { kind: 'swatch', reveal: 'Griechisches Flaggenblau' }, ['classic']),
  v('swatch-world-02', 'world', 2, 'Welches Grün hat die Flagge Irlands?', '#169B62', ['#169B62', '#6CBF3A', '#00594C', '#2FCF9E'], { kind: 'swatch', reveal: 'Irisches Flaggengrün' }, ['classic']),
  v('swatch-world-03', 'world', 3, 'Welches Rot hat die Flagge der Niederlande?', '#AE1C28', ['#AE1C28', '#FF7F00', '#E8503A', '#6B0F1A'], { kind: 'swatch', reveal: 'Helder vermiljoen – kein Oranje!' }, ['odd']),

  // food
  v('swatch-food-01', 'food', 1, 'Welche Farbe hat ein Aperol Spritz?', '#F26B1D', ['#F26B1D', '#C8102E', '#FFB81C', '#E8457A'], { kind: 'swatch', reveal: 'Aperol-Orange' }, ['classic']),
  v('swatch-food-02', 'food', 2, 'Welcher Farbton heißt „Lachs“?', '#FA8072', ['#FA8072', '#FF5E8A', '#F4A460', '#C8553D'], { kind: 'swatch', reveal: 'Lachsrosa' }, ['odd']),
]
