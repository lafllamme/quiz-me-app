export type DifficultyLevel = 1 | 2 | 3

export type QuizCategoryId = 'cologne' | 'music' | 'screen' | 'internet' | 'knowledge' | 'nostalgia'

export type QuestionTag = 'local' | 'classic' | 'current' | 'chat' | 'odd' | 'nostalgia'

/** Visual question formats. A category tile can advertise one of them per turn. */
export type VisualKind = 'emoji' | 'doodle' | 'trend' | 'swatch'

export type QuestionMedia =
  /** A short emoji sequence that encodes the answer. */
  | { kind: 'emoji', symbols: string }
  /** A deliberately crude line drawing; paths are stroked, never filled. */
  | { kind: 'doodle', viewBox: string, paths: readonly string[] }
  /** Monthly search interest (0–100), starting in January of `from`. */
  | { kind: 'trend', from: number, values: readonly number[] }
  /** The four options are hex colours; `reveal` names the correct one for the answer line. */
  | { kind: 'swatch', reveal: string }

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
  media?: QuestionMedia
}

export interface TieQuestion {
  question: string
  answer: number
}
