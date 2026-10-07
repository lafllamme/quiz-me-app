import { formatEstimate } from '../../utils/estimate-format'
import type { DifficultyLevel, QuestionMedia, QuestionTag, QuizCategoryId } from '../quiz-catalog.types'

export interface QuestionSeed {
  id: string
  categoryId: QuizCategoryId
  difficulty: DifficultyLevel
  question: string
  answer: string
  options: readonly [string, string, string, string]
  tags?: readonly QuestionTag[]
  media?: QuestionMedia
  estimate?: { value: number, unit: string }
}

export const q = (
  id: string,
  categoryId: QuizCategoryId,
  difficulty: DifficultyLevel,
  question: string,
  answer: string,
  options: readonly [string, string, string, string],
  tags: readonly QuestionTag[] = [],
): QuestionSeed => ({ id, categoryId, difficulty, question, answer, options, tags })

/** Visual question: same as `q`, plus the media the stage renders above the answers. */
export const v = (
  id: string,
  categoryId: QuizCategoryId,
  difficulty: DifficultyLevel,
  question: string,
  answer: string,
  options: readonly [string, string, string, string],
  media: QuestionMedia,
  tags: readonly QuestionTag[] = [],
): QuestionSeed => ({ id, categoryId, difficulty, question, answer, options, tags, media })


/**
 * Estimation question: both teams type a number and the closer guess scores. The four
 * options are derived so the question still satisfies the shared shape.
 */
export const e = (
  id: string,
  difficulty: DifficultyLevel,
  question: string,
  value: number,
  unit: string,
  tags: readonly QuestionTag[] = [],
): QuestionSeed => {
  const format = (amount: number) => `${formatEstimate(amount, unit)}${unit ? ` ${unit}` : ''}`
  const answer = format(value)
  const decoys = [...new Set([0.5, 2, 4, 3, 10, 20].map(factor => format(Math.round(value * factor))))].filter(option => option !== answer).slice(0, 3)
  return { id, categoryId: 'estimate', difficulty, question, answer, options: [answer, ...decoys] as [string, string, string, string], tags, estimate: { value, unit } }
}
