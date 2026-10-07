import { v, type QuestionSeed } from './seed'

// Flags are FlagSpec strings (see app/utils/flag-spec.ts). Swap sources are copied from
// node_modules/flag-icons/flags/4x3/<code>.svg. Two colours are swapped via a near-identical
// temporary hex so the second swap doesn't catch the first one's result.
export const flagQuestions: readonly QuestionSeed[] = [
  // Which country? – one flag, text options with look-alikes
  v('flag-world-01', 'world', 1, 'Welches Land hat diese Flagge?', 'Australien', ['Australien', 'Neuseeland', 'Fidschi', 'Tuvalu'], { kind: 'flag', show: 'au' }, ['classic']),
  v('flag-world-02', 'world', 1, 'Welches Land weht hier?', 'Rumänien', ['Rumänien', 'Belgien', 'Moldau', 'Kolumbien'], { kind: 'flag', show: 'ro' }, ['classic']),
  v('flag-world-03', 'world', 1, 'Wessen Flagge ist das?', 'Belgien', ['Belgien', 'Deutschland', 'Rumänien', 'Uganda'], { kind: 'flag', show: 'be' }, ['classic']),
  v('flag-world-04', 'world', 1, 'Welches Land hat diese Flagge?', 'Tschechien', ['Tschechien', 'Slowakei', 'Philippinen', 'Kuba'], { kind: 'flag', show: 'cz' }, ['classic']),
  v('flag-world-05', 'world', 1, 'Welches Land weht hier?', 'Niederlande', ['Niederlande', 'Luxemburg', 'Russland', 'Kroatien'], { kind: 'flag', show: 'nl' }, ['classic']),
  v('flag-world-06', 'world', 2, 'Welches Land hat diese Flagge?', 'Elfenbeinküste', ['Elfenbeinküste', 'Irland', 'Italien', 'Niger'], { kind: 'flag', show: 'ci' }, ['odd']),
  v('flag-world-07', 'world', 2, 'Wessen Flagge ist das?', 'Island', ['Island', 'Norwegen', 'Färöer', 'Finnland'], { kind: 'flag', show: 'is' }, ['classic']),
  v('flag-world-08', 'world', 2, 'Welches Land weht hier?', 'Slowakei', ['Slowakei', 'Slowenien', 'Russland', 'Serbien'], { kind: 'flag', show: 'sk' }, ['classic']),
  v('flag-world-09', 'world', 2, 'Diese Flagge haben zwei Länder. Welche?', 'Indonesien und Monaco', ['Indonesien und Monaco', 'Polen und Monaco', 'Indonesien und Polen', 'Singapur und Malta'], { kind: 'flag', show: 'id' }, ['odd']),
  v('flag-world-10', 'world', 2, 'Welches Land hat diese Flagge?', 'Österreich', ['Österreich', 'Lettland', 'Peru', 'Libanon'], { kind: 'flag', show: 'at' }, ['classic']),
  v('flag-world-11', 'world', 2, 'Wessen Flagge ist das?', 'Ungarn', ['Ungarn', 'Bulgarien', 'Italien', 'Iran'], { kind: 'flag', show: 'hu' }, ['classic']),
  v('flag-world-12', 'world', 2, 'Welches Land weht hier?', 'Estland', ['Estland', 'Botswana', 'Finnland', 'Lettland'], { kind: 'flag', show: 'ee' }, ['classic']),
  v('flag-world-13', 'world', 2, 'Welches Land hat diese Flagge?', 'Kolumbien', ['Kolumbien', 'Ecuador', 'Venezuela', 'Rumänien'], { kind: 'flag', show: 'co' }, ['classic']),
  v('flag-world-14', 'world', 2, 'Wem gehört diese Flagge?', 'Chile', ['Chile', 'Texas', 'Kuba', 'Puerto Rico'], { kind: 'flag', show: 'cl' }, ['odd']),
  v('flag-world-15', 'world', 3, 'Welches Land weht hier?', 'Senegal', ['Senegal', 'Mali', 'Guinea', 'Kamerun'], { kind: 'flag', show: 'sn' }, ['odd']),
  v('flag-world-16', 'world', 3, 'Wessen Flagge ist das?', 'Litauen', ['Litauen', 'Bolivien', 'Ghana', 'Äthiopien'], { kind: 'flag', show: 'lt' }, ['odd']),
  v('flag-world-17', 'world', 3, 'Welches Land hat diese Flagge?', 'Palau', ['Palau', 'Bangladesch', 'Japan', 'Laos'], { kind: 'flag', show: 'pw' }, ['odd']),
  v('flag-world-18', 'world', 3, 'Welches Land weht hier?', 'Jemen', ['Jemen', 'Ägypten', 'Irak', 'Syrien'], { kind: 'flag', show: 'ye' }, ['odd']),
  v('flag-world-19', 'world', 3, 'Wessen Flagge ist das?', 'Andorra', ['Andorra', 'Moldau', 'Rumänien', 'Tschad'], { kind: 'flag', show: 'ad' }, ['odd']),
  v('flag-world-20', 'world', 3, 'Und welches Land ist das hier?', 'Tschad', ['Tschad', 'Moldau', 'Andorra', 'Belgien'], { kind: 'flag', show: 'td' }, ['odd']),

  // Real or fake? – 1 real flag + 3 manipulated copies of it
  v('flag-world-21', 'world', 1, 'Welche ist die echte deutsche Flagge?', 'de', ['de', 'de|fc0>2e7d32', 'de|000001>fc1|fc0>000001', 'de|red>0055a4'], { kind: 'flag', reveal: 'Die echte Flagge Deutschlands' }, ['classic']),
  v('flag-world-22', 'world', 1, 'Welche ist die echte Schweizer Flagge?', 'ch', ['ch', 'ch|fff>fc0', 'ch|fff>ff0101|red>fff', 'ch|red>0055a4'], { kind: 'flag', reveal: 'Die Schweiz – umgekehrt wäre es das Rote Kreuz' }, ['classic']),
  v('flag-world-23', 'world', 1, 'Welche ist die echte Flagge Kanadas?', 'ca', ['ca', 'ca|d52b1e>0055a4', 'ca|d52b1e>2e7d32', 'ca|fff>d52b1f|d52b1e>fff'], { kind: 'flag', reveal: 'Die echte Flagge Kanadas' }, ['classic']),
  v('flag-world-24', 'world', 2, 'Welche ist die echte Flagge Frankreichs?', 'fr', ['fr', 'fr|mirror', 'fr|e1000f>ff7900', 'fr|000091>5bc0eb'], { kind: 'flag', reveal: 'Frankreich – Blau weht am Mast' }, ['classic']),
  v('flag-world-25', 'world', 2, 'Welche ist die echte Flagge Italiens?', 'it', ['it', 'it|mirror', 'it|009246>ff7900', 'it|ce2b37>fc0'], { kind: 'flag', reveal: 'Italien – Grün weht am Mast' }, ['classic']),
  v('flag-world-26', 'world', 2, 'Welche ist die echte Flagge Irlands?', 'ie', ['ie', 'ie|mirror', 'ie|009A49>0055a4', 'ie|FF7900>fc0'], { kind: 'flag', reveal: 'Irland – gespiegelt wäre es fast die Elfenbeinküste' }, ['odd']),
  v('flag-world-27', 'world', 2, 'Welche ist die echte Flagge Griechenlands?', 'gr', ['gr', 'gr|mirror', 'gr|0d5eaf>75aadb', 'gr|0d5eaf>009246'], { kind: 'flag', reveal: 'Griechenland – Kreuz oben links, kräftiges Blau' }, ['classic']),
  v('flag-world-28', 'world', 2, 'Welche ist die echte Flagge der Türkei?', 'tr', ['tr', 'tr|mirror', 'tr|fff>fc0', 'tr|e30a17>0055a4'], { kind: 'flag', reveal: 'Die Türkei – Mondsichel öffnet sich nach rechts' }, ['classic']),
  v('flag-world-29', 'world', 2, 'Welche ist die echte Flagge Dänemarks?', 'dk', ['dk', 'dk|mirror', 'dk|c8102e>0055a4', 'dk|fff>c8102f|c8102e>fff'], { kind: 'flag', reveal: 'Dänemark – das Kreuz sitzt näher am Mast' }, ['classic']),
  v('flag-world-30', 'world', 2, 'Welche ist die echte Flagge Indiens?', 'in', ['in', 'in|f93>128808|128807>f93', 'in|f93>d52b1e', 'in|008>f93'], { kind: 'flag', reveal: 'Indien – Safran oben, blaues Rad in der Mitte' }, ['classic']),
  v('flag-world-31', 'world', 3, 'Welcher Union Jack ist echt?', 'gb', ['gb', 'gb|mirror', 'gb|C8102E>012168|012169>C8102E', 'gb|012169>000001'], { kind: 'flag', reveal: 'Der echte Union Jack – die roten Diagonalen sind versetzt' }, ['odd']),
  v('flag-world-32', 'world', 3, 'Welche ist die echte Flagge Südkoreas?', 'kr', ['kr', 'kr|mirror', 'kr|cd2e3a>0047a1|0047a0>cd2e3a', 'kr|000001>0047a0'], { kind: 'flag', reveal: 'Südkorea – Rot oben, Blau unten' }, ['odd']),
  v('flag-world-33', 'world', 3, 'Welche ist die echte Flagge der Niederlande?', 'nl', ['nl', 'nl|ae1c28>ff7900', 'nl|21468b>00a1de', 'nl|ae1c28>21468c|21468b>ae1c28'], { kind: 'flag', reveal: 'Die Niederlande – mit Hellblau wäre es fast Luxemburg' }, ['odd']),
  v('flag-world-34', 'world', 3, 'Welche ist die echte Flagge Norwegens?', 'no', ['no', 'no|mirror', 'no|ed2939>002665|002664>ed2939', 'no|002664>fc0'], { kind: 'flag', reveal: 'Norwegen – Rot und Blau vertauscht wäre fast Island' }, ['odd']),
  v('flag-world-35', 'world', 3, 'Welche ist die echte Flagge Brasiliens?', 'br', ['br', 'br|mirror', 'br|2b49a3>000001', 'br|f8e509>ff7900'], { kind: 'flag', reveal: 'Brasilien – das Band liest sich von links nach rechts' }, ['odd']),

  // What's wrong with this flag? – sometimes nothing
  v('flag-world-36', 'world', 1, 'Das soll die Ukraine sein. Was stimmt nicht?', 'Blau und Gelb vertauscht', ['Blau und Gelb vertauscht', 'Blau zu dunkel', 'Gelb zu blass', 'Alles richtig'], { kind: 'flag', show: 'ua|gold>0057b9|0057b8>ffd700' }, ['classic']),
  v('flag-world-37', 'world', 1, 'Das soll die USA sein. Was stimmt nicht?', 'Gespiegelt', ['Gespiegelt', 'Zu wenige Streifen', 'Ein Stern fehlt', 'Alles richtig'], { kind: 'flag', show: 'us|mirror' }, ['classic']),
  v('flag-world-38', 'world', 1, 'Das soll Japan sein. Was stimmt nicht?', 'Gelb statt Rot', ['Gelb statt Rot', 'Kreis zu klein', 'Kreis nicht mittig', 'Alles richtig'], { kind: 'flag', show: 'jp|bc002d>fc0' }, ['classic']),
  v('flag-world-39', 'world', 2, 'Das soll Schweden sein. Was stimmt nicht?', 'Blau und Gelb vertauscht', ['Blau und Gelb vertauscht', 'Gespiegelt', 'Kreuz zu dick', 'Alles richtig'], { kind: 'flag', show: 'se|005293>fecb01|fecb00>005293' }, ['classic']),
  v('flag-world-40', 'world', 2, 'Das soll Kanada sein. Was stimmt nicht?', 'Alles richtig', ['Alles richtig', 'Rot und Weiß vertauscht', 'Blatt steht Kopf', 'Blatt ohne Stiel'], { kind: 'flag', show: 'ca' }, ['odd']),
  v('flag-world-41', 'world', 2, 'Das soll Spanien sein. Was stimmt nicht?', 'Gespiegelt', ['Gespiegelt', 'Gelb zu breit', 'Rot und Gelb vertauscht', 'Alles richtig'], { kind: 'flag', show: 'es|mirror' }, ['classic']),
  v('flag-world-42', 'world', 2, 'Das soll Belgien sein. Was stimmt nicht?', 'Alles richtig', ['Alles richtig', 'Gespiegelt', 'Gelb und Rot vertauscht', 'Schwarz statt Blau'], { kind: 'flag', show: 'be' }, ['odd']),
  v('flag-world-43', 'world', 3, 'Das soll Tschechien sein. Was stimmt nicht?', 'Gespiegelt', ['Gespiegelt', 'Weiß und Rot vertauscht', 'Dreieck zu klein', 'Alles richtig'], { kind: 'flag', show: 'cz|mirror' }, ['odd']),
  v('flag-world-44', 'world', 3, 'Das soll Mexiko sein. Was stimmt nicht?', 'Gespiegelt', ['Gespiegelt', 'Adler zu groß', 'Schlange fehlt', 'Alles richtig'], { kind: 'flag', show: 'mx|mirror' }, ['odd']),
  v('flag-world-45', 'world', 3, 'Das soll Portugal sein. Was stimmt nicht?', 'Gespiegelt', ['Gespiegelt', 'Wappen zu klein', 'Grün zu dunkel', 'Alles richtig'], { kind: 'flag', show: 'pt|mirror' }, ['odd']),
  v('flag-world-46', 'world', 3, 'Das soll Finnland sein. Was stimmt nicht?', 'Gespiegelt', ['Gespiegelt', 'Kreuz zu dick', 'Blau zu dunkel', 'Alles richtig'], { kind: 'flag', show: 'fi|mirror' }, ['odd']),
  v('flag-world-47', 'world', 3, 'Das soll Island sein. Was stimmt nicht?', 'Alles richtig', ['Alles richtig', 'Rot und Blau vertauscht', 'Gespiegelt', 'Blau zu dunkel'], { kind: 'flag', show: 'is' }, ['odd']),

  // Which flag belongs to X? – four real look-alikes
  v('flag-world-48', 'world', 1, 'Welche Flagge gehört zu Italien?', 'it', ['it', 'mx', 'ie', 'hu'], { kind: 'flag', reveal: 'Italien – Mexiko hat den Adler' }, ['classic']),
  v('flag-world-49', 'world', 1, 'Welche Flagge gehört zu Norwegen?', 'no', ['no', 'is', 'fo', 'dk'], { kind: 'flag', reveal: 'Norwegen – rot mit blauem Kreuz' }, ['classic']),
  v('flag-world-50', 'world', 1, 'Welche Flagge gehört zu Polen?', 'pl', ['pl', 'id', 'mc', 'sg'], { kind: 'flag', reveal: 'Polen – Weiß oben, Rot unten' }, ['classic']),
  v('flag-world-51', 'world', 1, 'Welche Flagge gehört zu Bangladesch?', 'bd', ['bd', 'jp', 'pw', 'la'], { kind: 'flag', reveal: 'Bangladesch – roter Kreis auf Grün' }, ['classic']),
  v('flag-world-52', 'world', 2, 'Welche Flagge gehört zu Neuseeland?', 'nz', ['nz', 'au', 'ck', 'tv'], { kind: 'flag', reveal: 'Neuseeland – rote Sterne statt weißer' }, ['classic']),
  v('flag-world-53', 'world', 2, 'Welche Flagge gehört zu Luxemburg?', 'lu', ['lu', 'nl', 'py', 'ru'], { kind: 'flag', reveal: 'Luxemburg – das Blau ist heller als bei den Niederlanden' }, ['odd']),
  v('flag-world-54', 'world', 2, 'Welche Flagge gehört zu Venezuela?', 've', ['ve', 'co', 'ec', 'am'], { kind: 'flag', reveal: 'Venezuela – der Sternenbogen' }, ['classic']),
  v('flag-world-55', 'world', 2, 'Welche Flagge gehört zu Ägypten?', 'eg', ['eg', 'ye', 'iq', 'sd'], { kind: 'flag', reveal: 'Ägypten – mit goldenem Adler' }, ['classic']),
  v('flag-world-56', 'world', 2, 'Welche Flagge gehört zu Peru?', 'pe', ['pe', 'at', 'ca', 'lv'], { kind: 'flag', reveal: 'Peru – Rot-Weiß-Rot, aber senkrecht' }, ['odd']),
  v('flag-world-57', 'world', 3, 'Welche Flagge gehört zu Slowenien?', 'si', ['si', 'sk', 'ru', 'rs'], { kind: 'flag', reveal: 'Slowenien – Wappen mit Berg und Sternen' }, ['odd']),
  v('flag-world-58', 'world', 3, 'Welche Flagge gehört zu Kamerun?', 'cm', ['cm', 'sn', 'ml', 'gn'], { kind: 'flag', reveal: 'Kamerun – gelber Stern auf dem roten Streifen' }, ['odd']),
  v('flag-world-59', 'world', 3, 'Welche Flagge gehört zu Rumänien?', 'ro', ['ro', 'td', 'ad', 'md'], { kind: 'flag', reveal: 'Rumänien – beim Tschad ist das Blau dunkler' }, ['odd']),
  v('flag-world-60', 'world', 3, 'Welche Flagge gehört zu Liberia?', 'lr', ['lr', 'us', 'my', 'cl'], { kind: 'flag', reveal: 'Liberia – ein Stern, elf Streifen' }, ['odd']),
]
