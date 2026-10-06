import { v, type QuestionSeed } from './seed'

export const emojiQuestions: readonly QuestionSeed[] = [
  // screen
  v('emoji-screen-01', 'screen', 1, 'Welcher Film ist das?', 'Oben', ['Oben', 'Der Zauberer von Oz', 'Kevin – Allein zu Haus', 'Es'], { kind: 'emoji', symbols: '👴🎈🏠' }, ['classic']),
  v('emoji-screen-02', 'screen', 1, 'Welcher Film ist das?', 'Titanic', ['Titanic', 'Life of Pi', 'Die Eiskönigin', 'Fluch der Karibik'], { kind: 'emoji', symbols: '🚢🧊💔🎻' }, ['classic']),
  v('emoji-screen-03', 'screen', 2, 'Welcher Film ist das?', 'Ghostbusters', ['Ghostbusters', 'Casper', 'Scary Movie', 'Poltergeist'], { kind: 'emoji', symbols: '👻🚫🚒' }, ['classic']),
  v('emoji-screen-04', 'screen', 2, 'Welche Serie ist das?', 'Stranger Things', ['Stranger Things', 'E.T. – Der Außerirdische', 'Dark', 'Die Goonies'], { kind: 'emoji', symbols: '🚲🧇🔦👾' }, ['current']),
  v('emoji-screen-05', 'screen', 3, 'Welcher Film ist das?', 'Forrest Gump', ['Forrest Gump', 'Rain Man', 'Big Fish', 'Catch Me If You Can'], { kind: 'emoji', symbols: '🏃🍫🦐🪶' }, ['classic']),
  v('emoji-screen-06', 'screen', 3, 'Welcher Film ist das?', 'Inception', ['Inception', 'Tenet', 'Interstellar', 'Shutter Island'], { kind: 'emoji', symbols: '😴🪆🌀' }, ['classic']),

  // music
  v('emoji-music-01', 'music', 1, 'Welcher Song ist das?', 'Watermelon Sugar', ['Watermelon Sugar', 'Sugar', 'Peaches', 'Cake by the Ocean'], { kind: 'emoji', symbols: '🍉🍬' }, ['current']),
  v('emoji-music-02', 'music', 1, 'Welche Band ist das?', 'Red Hot Chili Peppers', ['Red Hot Chili Peppers', 'Black Eyed Peas', 'Arctic Monkeys', 'Foo Fighters'], { kind: 'emoji', symbols: '🔴🔥🌶️🌶️' }, ['classic']),
  v('emoji-music-03', 'music', 2, 'Welcher Song ist das?', 'Atemlos durch die Nacht', ['Atemlos durch die Nacht', 'Durch die Nacht', 'Wind of Change', 'Tage wie diese'], { kind: 'emoji', symbols: '🚫😮💨🌙' }, ['classic']),
  v('emoji-music-04', 'music', 2, 'Welche Band ist das?', 'Die Ärzte', ['Die Ärzte', 'Die Toten Hosen', 'Die Prinzen', 'Wir sind Helden'], { kind: 'emoji', symbols: '👨‍⚕️👩‍⚕️👨‍⚕️' }, ['classic']),
  v('emoji-music-05', 'music', 3, 'Welcher Song ist das?', 'Hotel California', ['Hotel California', 'Californication', 'Heartbreak Hotel', 'California Love'], { kind: 'emoji', symbols: '🏨🌴☀️🎸' }, ['classic']),

  // knowledge: German idioms
  v('emoji-knowledge-01', 'knowledge', 1, 'Welches Sprichwort ist das?', 'Lieber den Spatz in der Hand …', ['Lieber den Spatz in der Hand …', 'Der frühe Vogel fängt den Wurm', 'Einen Vogel haben', 'Zwei Fliegen mit einer Klappe'], { kind: 'emoji', symbols: '✋🐦👍🏠🕊️' }, ['classic']),
  v('emoji-knowledge-02', 'knowledge', 2, 'Welche Redewendung ist das?', 'Da liegt der Hund begraben', ['Da liegt der Hund begraben', 'Den Letzten beißen die Hunde', 'Schlafende Hunde wecken', 'Bekannt wie ein bunter Hund'], { kind: 'emoji', symbols: '🐕⚰️📍' }, ['classic']),
  v('emoji-knowledge-03', 'knowledge', 2, 'Welche Redewendung ist das?', 'Ich verstehe nur Bahnhof', ['Ich verstehe nur Bahnhof', 'Der Zug ist abgefahren', 'Auf dem Holzweg sein', 'Auf dem Abstellgleis stehen'], { kind: 'emoji', symbols: '👂🚉🤷' }, ['chat']),
  v('emoji-knowledge-04', 'knowledge', 3, 'Welche Redewendung ist das?', 'Ich glaub, mein Schwein pfeift', ['Ich glaub, mein Schwein pfeift', 'Schwein gehabt', 'Perlen vor die Säue werfen', 'Die Spatzen pfeifen es …'], { kind: 'emoji', symbols: '🐷😗🎶😳' }, ['odd']),

  // cologne
  v('emoji-cologne-01', 'cologne', 1, 'Welcher Karnevalsbegriff ist das?', 'Kamelle', ['Kamelle', 'Strüßjer', 'Bützje', 'Alaaf'], { kind: 'emoji', symbols: '🐪🐪🍬🎭' }, ['local']),
  v('emoji-cologne-02', 'cologne', 2, 'Welcher Kölner Ort ist das?', 'Hohenzollernbrücke', ['Hohenzollernbrücke', 'Severinsbrücke', 'Deutzer Brücke', 'Rheinauhafen'], { kind: 'emoji', symbols: '❤️🔒🌉🚆' }, ['local']),
]
