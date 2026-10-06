export type DifficultyLevel = 1 | 2 | 3

export type QuizCategoryId = 'cologne' | 'music' | 'screen' | 'internet' | 'knowledge' | 'nostalgia'

export type QuestionTag = 'local' | 'classic' | 'current' | 'chat' | 'odd' | 'nostalgia'

export interface QuizCategory {
  id: QuizCategoryId
  label: string
  descriptor: string
}

export interface QuizQuestion {
  id: string
  categoryId: QuizCategoryId
  category: string
  question: string
  answer: string
  options: readonly [string, string, string, string]
  correctIndex: number
  difficulty: DifficultyLevel
  tags: readonly QuestionTag[]
}

export interface TieQuestion {
  question: string
  answer: number
}
