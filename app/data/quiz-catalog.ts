import type { QuestionSeed } from './catalog/seed'
import { cologneQuestions } from './catalog/cologne'
import { internetQuestions } from './catalog/internet'
import { knowledgeQuestions } from './catalog/knowledge'
import { musicQuestions } from './catalog/music'
import { nostalgiaQuestions } from './catalog/nostalgia'
import { screenQuestions } from './catalog/screen'
import type {
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

const seeds: readonly QuestionSeed[] = [
  ...cologneQuestions,
  ...musicQuestions,
  ...screenQuestions,
  ...internetQuestions,
  ...knowledgeQuestions,
  ...nostalgiaQuestions,
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

function validateCatalog() {
  const ids = new Set<string>()
  const texts = new Set<string>()

  for (const question of QUESTIONS) {
    if (ids.has(question.id))
      throw new Error(`Duplicate quiz question id: ${question.id}`)
    ids.add(question.id)

    const text = question.question.trim().toLowerCase()
    if (texts.has(text))
      throw new Error(`Duplicate quiz question text: ${question.id}`)
    texts.add(text)

    if (question.options.length !== 4 || question.correctIndex < 0)
      throw new Error(`Invalid answer options for quiz question: ${question.id}`)

    if (new Set(question.options).size !== question.options.length)
      throw new Error(`Duplicate answer options for quiz question: ${question.id}`)
  }

  for (const category of QUIZ_CATEGORIES) {
    const stats = CATALOG_STATS[category.id]
    if (Math.min(stats.easy, stats.medium, stats.hard) < MIN_QUESTIONS_PER_DIFFICULTY)
      throw new Error(`Category ${category.label} needs at least ${MIN_QUESTIONS_PER_DIFFICULTY} questions per difficulty`)
  }
}

validateCatalog()
