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
