export interface QuizQuestion {
  id: string
  category: string
  question: string
  answer: string
  difficulty: 1 | 2 | 3
}

const bank: Record<string, Array<[string, string]>> = {
  Musik: [
    ['Wer singt „Blinding Lights“?', 'The Weeknd'],
    ['Welche Sängerin veröffentlichte „Bad Guy“?', 'Billie Eilish'],
    ['Welcher Rapper heißt Marshall Mathers?', 'Eminem'],
    ['Von wem ist „Rolling in the Deep“?', 'Adele'],
  ],
  Filme: [
    ['Wie heißt der grüne Oger mit einem Esel als Freund?', 'Shrek'],
    ['Welche Farbe hat die Pille, mit der Neo die Matrix verlässt?', 'Rot'],
    ['Wie heißt der Planet der Na’vi?', 'Pandora'],
    ['Wer spielt Jack in „Titanic“?', 'Leonardo DiCaprio'],
  ],
  Serien: [
    ['Wie heißt die Schule von Wednesday Addams?', 'Nevermore Academy'],
    ['Wie heißt der Chemielehrer in „Breaking Bad“?', 'Walter White'],
    ['In welcher Stadt spielt „Stranger Things“ hauptsächlich?', 'Hawkins'],
    ['Wie heißt der Coffeeshop in „Friends“?', 'Central Perk'],
  ],
  Memes: [
    ['Welches Tier versteckt sich hinter „Doge“?', 'Ein Shiba Inu'],
    ['Welcher Song läuft bei einem Rickroll?', 'Never Gonna Give You Up'],
    ['Was heißt „POV“ ausgeschrieben?', 'Point of View'],
    ['Welches Tier sitzt bei „This is fine“ im brennenden Raum?', 'Ein Hund'],
  ],
  'WTF-Wissen': [
    ['Wie viele Herzen hat ein Oktopus?', 'Drei'],
    ['Welches Tier macht würfelförmigen Kot?', 'Der Wombat'],
    ['Ist eine Banane botanisch eine Beere?', 'Ja'],
    ['Welche Farbe hat die Haut eines Eisbären?', 'Schwarz'],
  ],
  '2000er': [
    ['Welches Handyspiel steuert eine immer länger werdende Schlange?', 'Snake'],
    ['Wie heißt Nemos Vater?', 'Marlin'],
    ['Welche Konsole hatte die Wii Remote?', 'Nintendo Wii'],
    ['Welcher Messenger machte „Uh-oh!“?', 'ICQ'],
  ],
  '2010er': [
    ['Welches Spiel jagte 2016 alle nach draußen?', 'Pokémon GO'],
    ['Welche App hatte Videos mit maximal sechs Sekunden?', 'Vine'],
    ['Welches Spiel hat Creeper?', 'Minecraft'],
    ['Welches Battle-Royale-Spiel hat einen Battle Bus?', 'Fortnite'],
  ],
}

export const QUESTIONS: QuizQuestion[] = Object.entries(bank).flatMap(([category, rows]) =>
  rows.map(([question, answer], index) => ({
    id: `${category}-${index}`,
    category,
    question,
    answer,
    difficulty: (Math.min(3, 1 + Math.floor(index / 2)) as 1 | 2 | 3),
  })),
)

export const TIE_QUESTIONS = [
  { question: 'Wie viele Minuten hat eine Woche?', answer: 10080 },
  { question: 'Wie viele Kilometer beträgt der Erdumfang am Äquator ungefähr?', answer: 40075 },
  { question: 'Wie viele Sekunden hat ein Tag?', answer: 86400 },
]
