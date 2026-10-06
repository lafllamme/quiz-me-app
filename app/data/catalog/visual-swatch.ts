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
]
