export interface QuizQuestion {
  id: string
  category: string
  question: string
  answer: string
  options: string[]
  correctIndex: number
  difficulty: 1 | 2 | 3
}

type QuestionSeed = [question: string, answer: string, options: string[]]

const bank: Record<string, QuestionSeed[]> = {
  Musik: [
    ['Wer singt „Blinding Lights“?', 'The Weeknd', ['The Weeknd', 'Post Malone', 'Drake', 'Bruno Mars']],
    ['Welche Sängerin veröffentlichte „Bad Guy“?', 'Billie Eilish', ['Dua Lipa', 'Billie Eilish', 'Ariana Grande', 'Lorde']],
    ['Welcher Rapper heißt Marshall Mathers?', 'Eminem', ['Eminem', '50 Cent', 'Jay-Z', 'Kanye West']],
    ['Von wem ist „Rolling in the Deep“?', 'Adele', ['Adele', 'Rihanna', 'Amy Winehouse', 'Sia']],
  ],
  Filme: [
    ['Wie heißt der grüne Oger mit einem Esel als Freund?', 'Shrek', ['Shrek', 'Hulk', 'Groot', 'Yoda']],
    ['Welche Farbe hat die Pille, mit der Neo die Matrix verlässt?', 'Rot', ['Blau', 'Grün', 'Rot', 'Weiß']],
    ['Wie heißt der Planet der Na’vi?', 'Pandora', ['Arrakis', 'Pandora', 'Krypton', 'Endor']],
    ['Wer spielt Jack in „Titanic“?', 'Leonardo DiCaprio', ['Brad Pitt', 'Leonardo DiCaprio', 'Matt Damon', 'Tom Cruise']],
  ],
  Serien: [
    ['Wie heißt die Schule von Wednesday Addams?', 'Nevermore Academy', ['Riverdale High', 'Nevermore Academy', 'Hogwarts', 'Sunnydale High']],
    ['Wie heißt der Chemielehrer in „Breaking Bad“?', 'Walter White', ['Jesse Pinkman', 'Saul Goodman', 'Walter White', 'Hank Schrader']],
    ['In welcher Stadt spielt „Stranger Things“ hauptsächlich?', 'Hawkins', ['Hawkins', 'Sunnydale', 'Derry', 'Riverdale']],
    ['Wie heißt der Coffeeshop in „Friends“?', 'Central Perk', ['Luke’s Diner', 'Central Perk', 'Monk’s Café', 'The Max']],
  ],
  Memes: [
    ['Welches Tier versteckt sich hinter „Doge“?', 'Ein Shiba Inu', ['Ein Mops', 'Ein Shiba Inu', 'Ein Fuchs', 'Ein Waschbär']],
    ['Welcher Song läuft bei einem Rickroll?', 'Never Gonna Give You Up', ['Take On Me', 'Never Gonna Give You Up', 'Africa', 'All Star']],
    ['Was heißt „POV“ ausgeschrieben?', 'Point of View', ['Point of View', 'Place of Video', 'Proof of Value', 'Power of Voice']],
    ['Welches Tier sitzt bei „This is fine“ im brennenden Raum?', 'Ein Hund', ['Eine Katze', 'Ein Hund', 'Ein Waschbär', 'Ein Frosch']],
  ],
  'WTF-Wissen': [
    ['Wie viele Herzen hat ein Oktopus?', 'Drei', ['Eins', 'Zwei', 'Drei', 'Vier']],
    ['Welches Tier macht würfelförmigen Kot?', 'Der Wombat', ['Der Koala', 'Der Wombat', 'Das Alpaka', 'Der Biber']],
    ['Ist eine Banane botanisch eine Beere?', 'Ja', ['Ja', 'Nein', 'Nur unreif', 'Nur gekocht']],
    ['Welche Farbe hat die Haut eines Eisbären?', 'Schwarz', ['Weiß', 'Rosa', 'Grau', 'Schwarz']],
  ],
  '2000er': [
    ['Welches Handyspiel steuert eine immer länger werdende Schlange?', 'Snake', ['Snake', 'Tetris', 'Doodle Jump', 'Bounce']],
    ['Wie heißt Nemos Vater?', 'Marlin', ['Bruce', 'Marlin', 'Dory', 'Gill']],
    ['Welche Konsole hatte die Wii Remote?', 'Nintendo Wii', ['PlayStation 2', 'Nintendo Wii', 'Xbox 360', 'Dreamcast']],
    ['Welcher Messenger machte „Uh-oh!“?', 'ICQ', ['MSN', 'ICQ', 'AIM', 'Skype']],
  ],
  '2010er': [
    ['Welches Spiel jagte 2016 alle nach draußen?', 'Pokémon GO', ['Pokémon GO', 'Ingress', 'Clash Royale', 'Wii Sports']],
    ['Welche App hatte Videos mit maximal sechs Sekunden?', 'Vine', ['Vine', 'Musical.ly', 'Periscope', 'Dubsmash']],
    ['Welches Spiel hat Creeper?', 'Minecraft', ['Terraria', 'Minecraft', 'Roblox', 'Fortnite']],
    ['Welches Battle-Royale-Spiel hat einen Battle Bus?', 'Fortnite', ['Apex Legends', 'PUBG', 'Fortnite', 'Warzone']],
  ],
}

export const QUESTIONS: QuizQuestion[] = Object.entries(bank).flatMap(([category, rows]) =>
  rows.map(([question, answer, options], index) => ({
    id: `${category}-${index}`,
    category,
    question,
    answer,
    options,
    correctIndex: options.indexOf(answer),
    difficulty: (Math.min(3, 1 + Math.floor(index / 2)) as 1 | 2 | 3),
  })),
)

export const TIE_QUESTIONS = [
  { question: 'Wie viele Minuten hat eine Woche?', answer: 10080 },
  { question: 'Wie viele Kilometer beträgt der Erdumfang am Äquator ungefähr?', answer: 40075 },
  { question: 'Wie viele Sekunden hat ein Tag?', answer: 86400 },
]
