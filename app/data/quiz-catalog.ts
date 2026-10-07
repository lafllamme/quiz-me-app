import type { QuestionSeed } from './catalog/seed'
import { animalsQuestions } from './catalog/animals'
import { brandsQuestions } from './catalog/brands'
import { cologneQuestions } from './catalog/cologne'
import { estimateQuestions } from './catalog/estimate'
import { foodQuestions } from './catalog/food'
import { gamingQuestions } from './catalog/gaming'
import { internetQuestions } from './catalog/internet'
import { knowledgeQuestions } from './catalog/knowledge'
import { languageQuestions } from './catalog/language'
import { musicQuestions } from './catalog/music'
import { nostalgiaQuestions } from './catalog/nostalgia'
import { screenQuestions } from './catalog/screen'
import { truthQuestions } from './catalog/truth'
import { doodleQuestions } from './catalog/visual-doodle'
import { emojiQuestions } from './catalog/visual-emoji'
import { flagQuestions } from './catalog/visual-flag'
import { pinQuestions } from './catalog/visual-pin'
import { pixelQuestions } from './catalog/visual-pixel'
import { quartetQuestions } from './catalog/visual-quartet'
import { silhouetteQuestions } from './catalog/visual-silhouette'
import { swatchQuestions } from './catalog/visual-swatch'
import { trendQuestions } from './catalog/visual-trend'
import { worldQuestions } from './catalog/world'
import { FLAG_SPEC } from '../utils/flag-spec'
import { GEO_MAPS } from './geo/maps'
import { GEO_SHAPES } from './geo/shapes'
import type {
  QuestionMedia,
  QuizCategory,
  QuizCategoryId,
  QuizQuestion,
  TieQuestion,
} from './quiz-catalog.types'

export type {
  DifficultyLevel,
  QuizCategory,
  QuizCategoryId,
  QuizQuestion,
  QuestionMedia,
  QuestionTag,
  TieQuestion,
  VisualKind,
} from './quiz-catalog.types'

export const QUIZ_CATEGORIES: readonly QuizCategory[] = [
  { id: 'cologne', label: 'Köln', descriptor: 'Stadt, FC und deutsche Geschichte' },
  { id: 'music', label: 'Musik', descriptor: 'Tracks, Stimmen und Ohrwürmer' },
  { id: 'screen', label: 'Film & Serie', descriptor: 'Kino, Streaming und Kultfiguren' },
  { id: 'internet', label: 'Netz & Memes', descriptor: 'Chat, Running Gags und Internetkultur' },
  { id: 'knowledge', label: 'Wissen', descriptor: 'Körper, Alltag und unnütze Fakten' },
  { id: 'nostalgia', label: 'Nostalgie', descriptor: '2000er, 2010er und frühe Netzkultur' },
  { id: 'animals', label: 'Tierisch', descriptor: 'Rekorde, Macken und seltsame Viecher' },
  { id: 'world', label: 'Einmal um die Welt', descriptor: 'Länder, Städte und Landkarten' },
  { id: 'food', label: 'Essen & Trinken', descriptor: 'Küche, Drinks und Snack-Geschichte' },
  { id: 'brands', label: 'Marken & Werbung', descriptor: 'Slogans, Logos und Konsumkultur' },
  { id: 'estimate', label: 'Schätzen', descriptor: 'Beide tippen eine Zahl, näher dran punktet' },
  { id: 'truth', label: 'Wahr oder gelogen', descriptor: 'Vier Behauptungen, eine ist erfunden' },
  { id: 'gaming', label: 'Gaming', descriptor: 'Konsolen, Klassiker und Rage-Quits' },
  { id: 'language', label: 'Sprache', descriptor: 'Wörter, Dialekte und fremde Zungen' },
]

const seeds: readonly QuestionSeed[] = [
  ...cologneQuestions,
  ...musicQuestions,
  ...screenQuestions,
  ...internetQuestions,
  ...knowledgeQuestions,
  ...nostalgiaQuestions,
  ...emojiQuestions,
  ...doodleQuestions,
  ...trendQuestions,
  ...swatchQuestions,
  ...animalsQuestions,
  ...worldQuestions,
  ...foodQuestions,
  ...brandsQuestions,
  ...estimateQuestions,
  ...truthQuestions,
  ...gamingQuestions,
  ...languageQuestions,
  ...silhouetteQuestions,
  ...quartetQuestions,
  ...pinQuestions,
  ...pixelQuestions,
  ...flagQuestions,
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
  { question: 'Wie viele Kilometer sind es Luftlinie von Köln nach Berlin ungefähr?', answer: 477 },
  { question: 'Wie viele Tasten hat ein klassisches Klavier?', answer: 88 },
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

/** Minimum questions per category and difficulty, so several game nights stay repeat-free. */
export const MIN_QUESTIONS_PER_DIFFICULTY = 20

const HEX_COLOUR = /^#[0-9A-F]{6}$/i

const VIEWBOX = /^[\d.\s-]+$/

function isValidMedia(media: QuestionMedia, options: readonly string[]) {
  switch (media.kind) {
    case 'emoji':
      return media.symbols.trim().length > 0
    case 'doodle':
      return media.paths.length > 0 && VIEWBOX.test(media.viewBox)
    case 'trend':
      return media.values.length >= 12 && media.values.every(value => value >= 0 && value <= 100)
    case 'swatch':
      return media.reveal.length > 0 && options.every(option => HEX_COLOUR.test(option))
    case 'silhouette':
      return 'shape' in media ? media.shape in GEO_SHAPES : media.path.length > 0 && VIEWBOX.test(media.viewBox)
    case 'quartet':
      return media.stats.length >= 3 && media.stats.length <= 5
    case 'pin':
      return media.map in GEO_MAPS && isInside(media.map, media.at) && (!media.reference || isInside(media.map, media.reference.at))
    case 'pixel':
      return media.rows.length > 0 && media.rows.length <= 24 && media.rows.every(row => row.length === media.rows[0]!.length && row.length <= 24 && [...row].every(char => char === '.' || char in media.palette))
    case 'flag':
      return 'show' in media ? FLAG_SPEC.test(media.show) : media.reveal.length > 0 && options.every(option => FLAG_SPEC.test(option))
    case 'phrase':
      return media.text.trim().length > 0
  }
}

function isInside(map: keyof typeof GEO_MAPS, [lon, lat]: readonly [number, number]) {
  const [west, east, south, north] = GEO_MAPS[map].bounds
  return lon >= west && lon <= east && lat >= south && lat <= north
}

function validateCatalog() {
  const ids = new Set<string>()
  const texts = new Set<string>()

  for (const question of QUESTIONS) {
    if (ids.has(question.id))
      throw new Error(`Duplicate quiz question id: ${question.id}`)
    ids.add(question.id)

    // Picture questions share prompts like „Welcher Film ist das?“, so the answer is part of the key.
    const text = `${question.question.trim().toLowerCase()}|${question.answer.toLowerCase()}`
    if (texts.has(text))
      throw new Error(`Duplicate quiz question text: ${question.id}`)
    texts.add(text)

    if (question.options.length !== 4 || question.correctIndex < 0)
      throw new Error(`Invalid answer options for quiz question: ${question.id}`)

    if (new Set(question.options).size !== question.options.length)
      throw new Error(`Duplicate answer options for quiz question: ${question.id}`)

    if (question.estimate && !Number.isFinite(question.estimate.value))
      throw new Error(`Invalid estimate for quiz question: ${question.id}`)

    if (question.media && !isValidMedia(question.media, question.options))
      throw new Error(`Invalid media for quiz question: ${question.id}`)
  }

  for (const category of QUIZ_CATEGORIES) {
    const stats = CATALOG_STATS[category.id]
    if (Math.min(stats.easy, stats.medium, stats.hard) < MIN_QUESTIONS_PER_DIFFICULTY)
      throw new Error(`Category ${category.label} needs at least ${MIN_QUESTIONS_PER_DIFFICULTY} questions per difficulty`)
  }
}

validateCatalog()
