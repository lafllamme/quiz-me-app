import type {
  DifficultyLevel,
  QuizCategory,
  QuizCategoryId,
  QuizQuestion,
  QuestionTag,
  TieQuestion,
} from './quiz-catalog.types'

export type {
  DifficultyLevel,
  QuizCategory,
  QuizCategoryId,
  QuizQuestion,
  QuestionTag,
  TieQuestion,
} from './quiz-catalog.types'

export const QUIZ_CATEGORIES: readonly QuizCategory[] = [
  { id: 'cologne', label: 'Köln', descriptor: 'Stadt, FC und deutsche Geschichte' },
  { id: 'music', label: 'Musik', descriptor: 'Tracks, Stimmen und Ohrwürmer' },
  { id: 'screen', label: 'Film & Serie', descriptor: 'Kino, Streaming und Kultfiguren' },
  { id: 'internet', label: 'Netz & Memes', descriptor: 'Chat, Running Gags und Internetkultur' },
  { id: 'knowledge', label: 'Wissen', descriptor: 'Körper, Alltag und unnütze Fakten' },
  { id: 'nostalgia', label: 'Nostalgie', descriptor: '2000er, 2010er und frühe Netzkultur' },
]

interface QuestionSeed {
  id: string
  categoryId: QuizCategoryId
  difficulty: DifficultyLevel
  question: string
  answer: string
  options: readonly [string, string, string, string]
  tags?: readonly QuestionTag[]
}

const q = (
  id: string,
  categoryId: QuizCategoryId,
  difficulty: DifficultyLevel,
  question: string,
  answer: string,
  options: readonly [string, string, string, string],
  tags: readonly QuestionTag[] = [],
): QuestionSeed => ({ id, categoryId, difficulty, question, answer, options, tags })

const seeds: readonly QuestionSeed[] = [
  // Köln · 5 leicht, 5 mittel, 5 schwer
  q('cologne-e-01', 'cologne', 1, 'Wie heißt das Maskottchen des 1. FC Köln?', 'Hennes', ['Hennes', 'Poldi', 'Geißbock Günter', 'Tünnes'], ['local']),
  q('cologne-e-02', 'cologne', 1, 'Welcher große Fluss fließt durch Köln?', 'Der Rhein', ['Die Elbe', 'Der Rhein', 'Die Donau', 'Die Ruhr'], ['local']),
  q('cologne-e-03', 'cologne', 1, 'Wie viele Spitzen hat der Kölner Dom?', 'Zwei', ['Eine', 'Zwei', 'Drei', 'Vier'], ['local']),
  q('cologne-e-04', 'cologne', 1, 'Welche Farbe gehört klassisch zum 1. FC Köln?', 'Rot und Weiß', ['Blau und Weiß', 'Rot und Weiß', 'Grün und Gelb', 'Schwarz und Gold'], ['local']),
  q('cologne-e-05', 'cologne', 1, 'Wie nennt man das Bier, das in Köln traditionell ausgeschenkt wird?', 'Kölsch', ['Alt', 'Pils', 'Kölsch', 'Helles'], ['local']),
  q('cologne-m-01', 'cologne', 2, 'In welchem Stadtteil liegt der Kölner Zoo?', 'Riehl', ['Riehl', 'Sülz', 'Deutz', 'Porz'], ['local']),
  q('cologne-m-02', 'cologne', 2, 'Wann wurde der 1. FC Köln gegründet?', '1948', ['1938', '1948', '1958', '1968'], ['local', 'classic']),
  q('cologne-m-03', 'cologne', 2, 'Wie viele Stadtbezirke hat Köln?', 'Neun', ['Sieben', 'Acht', 'Neun', 'Zwölf'], ['local']),
  q('cologne-m-04', 'cologne', 2, 'Wie heißt die bekannte Brücke mit den vielen Liebesschlössern?', 'Hohenzollernbrücke', ['Deutzer Brücke', 'Mülheimer Brücke', 'Hohenzollernbrücke', 'Severinsbrücke'], ['local']),
  q('cologne-m-05', 'cologne', 2, 'Wie viele Menschen lebten laut Stadt Köln Ende 2025 ungefähr in Köln?', 'Rund 1,1 Millionen', ['Rund 550.000', 'Rund 1,1 Millionen', 'Rund 2,4 Millionen', 'Rund 4 Millionen'], ['local', 'current']),
  q('cologne-h-01', 'cologne', 3, 'Wie hieß Köln zur Zeit der Römer?', 'Colonia Claudia Ara Agrippinensium', ['Colonia Claudia Ara Agrippinensium', 'Nova Roma Colonia', 'Augusta Treverorum', 'Colonia Rhenana'], ['local', 'classic']),
  q('cologne-h-02', 'cologne', 3, 'In welchem Jahr wurde der Kölner Dom vollendet?', '1880', ['1780', '1830', '1880', '1910'], ['local', 'classic']),
  q('cologne-h-03', 'cologne', 3, 'Wie heißt die Karnevalspuppe, die neben Schäl zu den Kölner Originalen gehört?', 'Tünnes', ['Tünnes', 'Hennes', 'Jan und Griet', 'Baas'], ['local', 'classic']),
  q('cologne-h-04', 'cologne', 3, 'Welcher Stadtteil liegt auf der rechten Rheinseite?', 'Deutz', ['Lindenthal', 'Ehrenfeld', 'Deutz', 'Sülz'], ['local']),
  q('cologne-h-05', 'cologne', 3, 'Wie heißt die römische Stadtmauer-Anlage, deren Nordtor am Dom noch sichtbar ist?', 'Nordtor', ['Nordtor', 'Porta Nigra', 'Römertor', 'Westpforte'], ['local', 'classic']),

  // Musik · 5 leicht, 5 mittel, 5 schwer
  q('music-e-01', 'music', 1, 'Wer singt „Blinding Lights“?', 'The Weeknd', ['The Weeknd', 'Post Malone', 'Drake', 'Bruno Mars'], ['current']),
  q('music-e-02', 'music', 1, 'Welche Sängerin veröffentlichte „Bad Guy“?', 'Billie Eilish', ['Dua Lipa', 'Billie Eilish', 'Ariana Grande', 'Lorde'], ['current']),
  q('music-e-03', 'music', 1, 'Welcher Rapper heißt mit bürgerlichem Namen Marshall Mathers?', 'Eminem', ['Eminem', '50 Cent', 'Jay-Z', 'Kanye West'], ['classic']),
  q('music-e-04', 'music', 1, 'Von wem ist „Rolling in the Deep“?', 'Adele', ['Adele', 'Rihanna', 'Amy Winehouse', 'Sia'], ['classic']),
  q('music-e-05', 'music', 1, 'Welcher dieser Titel ist kein Song von Bob Marley?', 'Wonderwall', ['Three Little Birds', 'Is This Love', 'Wonderwall', 'One Love'], ['classic']),
  q('music-m-01', 'music', 2, 'Wer sang 2025 die Halbzeitshow beim Super Bowl LIX?', 'Kendrick Lamar', ['Kendrick Lamar', 'Bad Bunny', 'Usher', 'The Weeknd'], ['current']),
  q('music-m-02', 'music', 2, 'Wie heißt Michael Jacksons Album mit „Billie Jean“?', 'Thriller', ['Bad', 'Thriller', 'Off the Wall', 'Dangerous'], ['classic']),
  q('music-m-03', 'music', 2, 'Welche Sängerin wurde als „Back to Black“-Interpretin bekannt?', 'Amy Winehouse', ['Amy Winehouse', 'Sade', 'Dido', 'Norah Jones'], ['classic']),
  q('music-m-04', 'music', 2, 'Welche Band veröffentlichte „Seven Nation Army“?', 'The White Stripes', ['The White Stripes', 'Arctic Monkeys', 'Muse', 'The Killers'], ['classic']),
  q('music-m-05', 'music', 2, 'Wie heißt der Sänger hinter „Purple Rain“?', 'Prince', ['Prince', 'Lenny Kravitz', 'David Bowie', 'Marvin Gaye'], ['classic']),
  q('music-h-01', 'music', 3, 'Wie lautet der bürgerliche Name von The Weeknd?', 'Abel Tesfaye', ['Abel Tesfaye', 'Amine Tesfaye', 'Theodore Tesfaye', 'Elias Tesfaye'], ['current']),
  q('music-h-02', 'music', 3, 'Welches Instrument spielt man mit 88 Tasten?', 'Klavier', ['Akkordeon', 'Klavier', 'Xylophon', 'Cembalo'], ['classic']),
  q('music-h-03', 'music', 3, 'Welche Band bestand aus John Lennon, Paul McCartney, George Harrison und Ringo Starr?', 'The Beatles', ['The Beatles', 'The Rolling Stones', 'ABBA', 'Queen'], ['classic']),
  q('music-h-04', 'music', 3, 'Aus welchem Land stammt Reggae ursprünglich?', 'Jamaika', ['Kuba', 'Jamaika', 'Nigeria', 'Brasilien'], ['classic']),
  q('music-h-05', 'music', 3, 'Welcher Komponist schrieb die 9. Sinfonie mit der „Ode an die Freude“?', 'Ludwig van Beethoven', ['Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven', 'Franz Schubert'], ['classic']),

  // Film & Serie · 5 leicht, 5 mittel, 5 schwer
  q('screen-e-01', 'screen', 1, 'Wie heißt der Hund bei „Family Guy“?', 'Brian', ['Brian', 'Stewie', 'Cleveland', 'Rufus'], ['classic', 'chat']),
  q('screen-e-02', 'screen', 1, 'Wie heißt der grüne Oger mit einem Esel als Freund?', 'Shrek', ['Shrek', 'Hulk', 'Groot', 'Yoda'], ['classic']),
  q('screen-e-03', 'screen', 1, 'Wie heißt der Coffeeshop in „Friends“?', 'Central Perk', ['Luke’s Diner', 'Central Perk', 'Monk’s Café', 'The Max'], ['classic']),
  q('screen-e-04', 'screen', 1, 'Wie heißt die Schule von Wednesday Addams?', 'Nevermore Academy', ['Riverdale High', 'Nevermore Academy', 'Hogwarts', 'Sunnydale High'], ['current']),
  q('screen-e-05', 'screen', 1, 'Wer spielt Jack in „Titanic“?', 'Leonardo DiCaprio', ['Brad Pitt', 'Leonardo DiCaprio', 'Matt Damon', 'Tom Cruise'], ['classic']),
  q('screen-m-01', 'screen', 2, 'Welche Farbe hat die Pille, mit der Neo die Matrix verlässt?', 'Rot', ['Blau', 'Grün', 'Rot', 'Weiß'], ['classic']),
  q('screen-m-02', 'screen', 2, 'Wie heißt der Planet der Na’vi in „Avatar“?', 'Pandora', ['Arrakis', 'Pandora', 'Krypton', 'Endor'], ['classic']),
  q('screen-m-03', 'screen', 2, 'Wie heißt der Chemielehrer in „Breaking Bad“?', 'Walter White', ['Jesse Pinkman', 'Saul Goodman', 'Walter White', 'Hank Schrader'], ['classic']),
  q('screen-m-04', 'screen', 2, 'In welcher Stadt spielt „Stranger Things“ hauptsächlich?', 'Hawkins', ['Hawkins', 'Sunnydale', 'Derry', 'Riverdale'], ['current']),
  q('screen-m-05', 'screen', 2, 'Wer spielt Barbie im Film „Barbie“ von 2023?', 'Margot Robbie', ['Emma Stone', 'Margot Robbie', 'Anne Hathaway', 'Florence Pugh'], ['current']),
  q('screen-h-01', 'screen', 3, 'Welcher Film gewann 2020 als erster nicht-englischsprachiger Film den Oscar für den besten Film?', 'Parasite', ['Parasite', 'Roma', 'Everything Everywhere All at Once', 'The Artist'], ['classic']),
  q('screen-h-02', 'screen', 3, 'Wie heißt das Raumschiff in „Alien“?', 'Nostromo', ['Nostromo', 'Serenity', 'Sulaco', 'Discovery One'], ['classic']),
  q('screen-h-03', 'screen', 3, 'Wer führte Regie bei „Interstellar“?', 'Christopher Nolan', ['Denis Villeneuve', 'Christopher Nolan', 'James Cameron', 'Ridley Scott'], ['classic']),
  q('screen-h-04', 'screen', 3, 'Wie heißt die fiktive Kleinstadt in „Twin Peaks“?', 'Twin Peaks', ['Twin Peaks', 'Mystic Falls', 'Stars Hollow', 'Hill Valley'], ['classic']),
  q('screen-h-05', 'screen', 3, 'Welche Serie spielt größtenteils im Gefängnis Fox River?', 'Prison Break', ['Lost', 'Prison Break', 'Ozark', 'The Wire'], ['classic']),

  // Netz & Memes · 5 leicht, 5 mittel, 5 schwer
  q('internet-e-01', 'internet', 1, 'Was bedeutet „POV“ in einem Meme?', 'Point of View', ['Point of View', 'Place of Video', 'Proof of Value', 'Power of Voice'], ['chat']),
  q('internet-e-02', 'internet', 1, 'Welches Tier steckt hinter „Doge“?', 'Ein Shiba Inu', ['Ein Mops', 'Ein Shiba Inu', 'Ein Fuchs', 'Ein Waschbär'], ['chat']),
  q('internet-e-03', 'internet', 1, 'Welcher Song läuft bei einem Rickroll?', 'Never Gonna Give You Up', ['Take On Me', 'Never Gonna Give You Up', 'Africa', 'All Star'], ['chat', 'classic']),
  q('internet-e-04', 'internet', 1, 'Was bedeutet „DM“ im Chat?', 'Direct Message', ['Daily Meme', 'Direct Message', 'Digital Music', 'Don’t Mention'], ['chat']),
  q('internet-e-05', 'internet', 1, 'Wofür steht „LOL“?', 'Laughing Out Loud', ['Lots of Likes', 'Laughing Out Loud', 'Link on Lock', 'Live Online'], ['chat']),
  q('internet-m-01', 'internet', 2, 'Wie nennt man es, wenn man endlos durch schlechte Nachrichten scrollt?', 'Doomscrolling', ['Doomscrolling', 'Deepdiving', 'Newslooping', 'Scrollsurfing'], ['chat', 'current']),
  q('internet-m-02', 'internet', 2, 'Wie viele Zeichen durfte ein Tweet ursprünglich höchstens haben?', '140', ['100', '140', '160', '280'], ['classic']),
  q('internet-m-03', 'internet', 2, 'Was ist eine „Copypasta“?', 'Ein oft kopierter Text', ['Ein kopiertes Bildformat', 'Ein oft kopierter Text', 'Ein Videofilter', 'Ein Passwortmanager'], ['chat']),
  q('internet-m-04', 'internet', 2, 'Welche Plattform ist besonders für sehr kurze Hochkantvideos bekannt?', 'TikTok', ['Tumblr', 'TikTok', 'Reddit', 'LinkedIn'], ['current']),
  q('internet-m-05', 'internet', 2, 'Was soll ein CAPTCHA normalerweise prüfen?', 'Ob jemand ein Mensch ist', ['Ob jemand volljährig ist', 'Ob jemand ein Mensch ist', 'Ob das WLAN schnell genug ist', 'Ob ein Passwort sicher ist'], ['chat']),
  q('internet-h-01', 'internet', 3, 'Aus welchem Comic stammt das Meme „This is fine“?', 'Gunshow', ['Gunshow', 'Dilbert', 'xkcd', 'Peanuts'], ['chat', 'classic']),
  q('internet-h-02', 'internet', 3, 'Wie heißt das Format mit dem Mann, der sich nach einer anderen Frau umdreht?', 'Distracted Boyfriend', ['Distracted Boyfriend', 'Confused Guy', 'Side-Eye Couple', 'Jealous Man'], ['chat', 'classic']),
  q('internet-h-03', 'internet', 3, 'Was bezeichnet „AFK“ beim Gaming?', 'Away From Keyboard', ['Away From Keyboard', 'Another Fast Kill', 'All Friends Known', 'Attack From King'], ['chat']),
  q('internet-h-04', 'internet', 3, 'Wie nennt man einen absichtlich provozierenden Beitrag im Internet?', 'Troll-Post', ['Troll-Post', 'Boost-Post', 'Lurk-Post', 'Ghost-Post'], ['chat']),
  q('internet-h-05', 'internet', 3, 'Welches Meme-Format zeigt meistens eine Reihe von Bildern mit einer immer weiter eskalierenden Reaktion?', 'Reaction-Meme', ['Reaction-Meme', 'Listicle', 'Threadjack', 'Screenshot-Story'], ['chat']),

  // Wissen · 5 leicht, 5 mittel, 5 schwer
  q('knowledge-e-01', 'knowledge', 1, 'Wie lautet die chemische Verbindung von Wasser?', 'H₂O', ['CO₂', 'H₂O', 'O₂', 'NaCl'], ['odd']),
  q('knowledge-e-02', 'knowledge', 1, 'Wie viele Bundesländer hat Deutschland?', '16', ['12', '14', '16', '18'], ['classic']),
  q('knowledge-e-03', 'knowledge', 1, 'Wie viele Herzen hat ein Oktopus?', 'Drei', ['Eins', 'Zwei', 'Drei', 'Vier'], ['odd']),
  q('knowledge-e-04', 'knowledge', 1, 'Welches Organ pumpt Blut durch den Körper?', 'Das Herz', ['Die Lunge', 'Das Herz', 'Die Leber', 'Die Niere'], ['classic']),
  q('knowledge-e-05', 'knowledge', 1, 'Welche Farbe hat die Haut eines Eisbären?', 'Schwarz', ['Weiß', 'Rosa', 'Grau', 'Schwarz'], ['odd']),
  q('knowledge-m-01', 'knowledge', 2, 'Wie viele Knochen hat ein erwachsener Mensch ungefähr?', '206', ['106', '206', '306', '406'], ['classic']),
  q('knowledge-m-02', 'knowledge', 2, 'Was ist das größte Organ des menschlichen Körpers?', 'Die Haut', ['Die Leber', 'Die Haut', 'Die Lunge', 'Das Gehirn'], ['classic']),
  q('knowledge-m-03', 'knowledge', 2, 'Bei welcher Temperatur kocht Wasser auf Meereshöhe?', '100 °C', ['0 °C', '50 °C', '100 °C', '150 °C'], ['classic']),
  q('knowledge-m-04', 'knowledge', 2, 'Welches Tier macht würfelförmigen Kot?', 'Der Wombat', ['Der Koala', 'Der Wombat', 'Das Alpaka', 'Der Biber'], ['odd']),
  q('knowledge-m-05', 'knowledge', 2, 'Ist eine Banane botanisch gesehen eine Beere?', 'Ja', ['Ja', 'Nein', 'Nur unreif', 'Nur gekocht'], ['odd']),
  q('knowledge-h-01', 'knowledge', 3, 'Wie viele Chromosomenpaare hat ein Mensch normalerweise?', '23', ['12', '23', '46', '48'], ['classic']),
  q('knowledge-h-02', 'knowledge', 3, 'Welches Metall ist bei Raumtemperatur flüssig?', 'Quecksilber', ['Aluminium', 'Quecksilber', 'Zink', 'Kupfer'], ['odd']),
  q('knowledge-h-03', 'knowledge', 3, 'Welches Säugetier kann als einziges wirklich aktiv fliegen?', 'Die Fledermaus', ['Das Flughörnchen', 'Die Fledermaus', 'Der Pinguin', 'Der Kolibri'], ['odd']),
  q('knowledge-h-04', 'knowledge', 3, 'Welcher Teil des Auges reguliert, wie viel Licht hineinfällt?', 'Die Iris', ['Die Netzhaut', 'Die Iris', 'Die Hornhaut', 'Der Sehnerv'], ['classic']),
  q('knowledge-h-05', 'knowledge', 3, 'Wie viele Organe hat der menschliche Körper ungefähr?', 'Rund 78', ['Rund 18', 'Rund 48', 'Rund 78', 'Rund 178'], ['odd']),

  // Nostalgie · 5 leicht, 5 mittel, 5 schwer
  q('nostalgia-e-01', 'nostalgia', 1, 'Welches Handyspiel steuert eine immer länger werdende Schlange?', 'Snake', ['Snake', 'Tetris', 'Doodle Jump', 'Bounce'], ['nostalgia']),
  q('nostalgia-e-02', 'nostalgia', 1, 'Wie heißt Nemos Vater?', 'Marlin', ['Bruce', 'Marlin', 'Dory', 'Gill'], ['classic', 'nostalgia']),
  q('nostalgia-e-03', 'nostalgia', 1, 'Welche Konsole hatte die Wii Remote?', 'Nintendo Wii', ['PlayStation 2', 'Nintendo Wii', 'Xbox 360', 'Dreamcast'], ['nostalgia']),
  q('nostalgia-e-04', 'nostalgia', 1, 'Welcher Messenger machte „Uh-oh!“?', 'ICQ', ['MSN', 'ICQ', 'AIM', 'Skype'], ['nostalgia']),
  q('nostalgia-e-05', 'nostalgia', 1, 'Welches Spiel jagte 2016 alle nach draußen?', 'Pokémon GO', ['Pokémon GO', 'Ingress', 'Clash Royale', 'Wii Sports'], ['nostalgia']),
  q('nostalgia-m-01', 'nostalgia', 2, 'Welche App hatte Videos mit maximal sechs Sekunden?', 'Vine', ['Vine', 'Musical.ly', 'Periscope', 'Dubsmash'], ['nostalgia']),
  q('nostalgia-m-02', 'nostalgia', 2, 'Welches Spiel hat Creeper?', 'Minecraft', ['Terraria', 'Minecraft', 'Roblox', 'Fortnite'], ['nostalgia']),
  q('nostalgia-m-03', 'nostalgia', 2, 'Wie hieß Microsofts Messenger vor Skype in vielen deutschen Chats?', 'MSN Messenger', ['MSN Messenger', 'Yahoo Messenger', 'ICQ Lite', 'Windows Chat'], ['nostalgia']),
  q('nostalgia-m-04', 'nostalgia', 2, 'Wie hieß die Bewegungssteuerung der Xbox 360?', 'Kinect', ['Kinect', 'Move', 'EyeToy', 'Wii Motion'], ['nostalgia']),
  q('nostalgia-m-05', 'nostalgia', 2, 'In welchem Jahr erschien die erste PlayStation in Japan?', '1994', ['1989', '1994', '1999', '2001'], ['nostalgia', 'classic']),
  q('nostalgia-h-01', 'nostalgia', 3, 'Wie oft wurde die PlayStation 2 ungefähr verkauft?', 'Rund 155 Millionen Mal', ['Rund 55 Millionen Mal', 'Rund 105 Millionen Mal', 'Rund 155 Millionen Mal', 'Rund 255 Millionen Mal'], ['nostalgia', 'classic']),
  q('nostalgia-h-02', 'nostalgia', 3, 'In welchem Jahr kam das erste iPhone auf den Markt?', '2007', ['2005', '2007', '2009', '2011'], ['nostalgia', 'classic']),
  q('nostalgia-h-03', 'nostalgia', 3, 'Wie hieß Nintendos erste weltweit erfolgreiche Handheld-Konsole?', 'Game Boy', ['Game Boy', 'Nintendo DS', 'Game Gear', 'Virtual Boy'], ['nostalgia', 'classic']),
  q('nostalgia-h-04', 'nostalgia', 3, 'Welches soziale Netzwerk hatte lange einen „Poke“-Button?', 'Facebook', ['Facebook', 'MySpace', 'SchülerVZ', 'Instagram'], ['nostalgia', 'classic']),
  q('nostalgia-h-05', 'nostalgia', 3, 'Welche PlayStation-Konsole war die erste mit eingebautem Blu-ray-Laufwerk?', 'PlayStation 3', ['PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PSP'], ['nostalgia', 'classic']),
]

function buildQuestion(seed: QuestionSeed): QuizQuestion {
  const category = QUIZ_CATEGORIES.find(item => item.id === seed.categoryId)
  if (!category)
    throw new Error(`Unknown quiz category: ${seed.categoryId}`)

  return {
    ...seed,
    category: category.label,
    correctIndex: seed.options.indexOf(seed.answer),
    tags: seed.tags ?? [],
  }
}

export const QUESTIONS: readonly QuizQuestion[] = seeds.map(buildQuestion)

export const TIE_QUESTIONS: readonly TieQuestion[] = [
  { question: 'Wie viele Minuten hat eine Woche?', answer: 10080 },
  { question: 'Wie viele Kilometer beträgt der Erdumfang am Äquator ungefähr?', answer: 40075 },
  { question: 'Wie viele Sekunden hat ein Tag?', answer: 86400 },
]

export const CATALOG_STATS = Object.fromEntries(QUIZ_CATEGORIES.map(category => [
  category.id,
  {
    total: QUESTIONS.filter(question => question.categoryId === category.id).length,
    easy: QUESTIONS.filter(question => question.categoryId === category.id && question.difficulty === 1).length,
    medium: QUESTIONS.filter(question => question.categoryId === category.id && question.difficulty === 2).length,
    hard: QUESTIONS.filter(question => question.categoryId === category.id && question.difficulty === 3).length,
  },
])) as Record<QuizCategoryId, { total: number; easy: number; medium: number; hard: number }>

function validateCatalog() {
  const ids = new Set<string>()

  if (QUESTIONS.length !== 90)
    throw new Error(`Expected 90 quiz questions, got ${QUESTIONS.length}`)

  for (const question of QUESTIONS) {
    if (ids.has(question.id))
      throw new Error(`Duplicate quiz question id: ${question.id}`)
    ids.add(question.id)

    if (question.options.length !== 4 || question.correctIndex < 0)
      throw new Error(`Invalid answer options for quiz question: ${question.id}`)

    const stats = CATALOG_STATS[question.categoryId]
    if (!stats)
      throw new Error(`Missing catalog stats for: ${question.categoryId}`)
  }

  for (const category of QUIZ_CATEGORIES) {
    const stats = CATALOG_STATS[category.id]
    if (stats.total !== 15 || stats.easy !== 5 || stats.medium !== 5 || stats.hard !== 5)
      throw new Error(`Category ${category.label} must contain 5 questions per difficulty`)
  }
}

validateCatalog()
