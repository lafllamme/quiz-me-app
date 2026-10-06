import type { DifficultyLevel, QuestionTag, QuizCategoryId } from '../quiz-catalog.types'

export interface QuestionSeed {
  id: string
  categoryId: QuizCategoryId
  difficulty: DifficultyLevel
  question: string
  answer: string
  options: readonly [string, string, string, string]
  tags?: readonly QuestionTag[]
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
