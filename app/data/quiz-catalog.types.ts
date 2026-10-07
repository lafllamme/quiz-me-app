import type { GeoMapId } from './geo/maps'
import type { GeoShapeId } from './geo/shapes'

export type DifficultyLevel = 1 | 2 | 3

export type QuizCategoryId = 'cologne' | 'music' | 'screen' | 'internet' | 'knowledge' | 'nostalgia' | 'animals' | 'world' | 'food' | 'brands' | 'estimate' | 'truth' | 'gaming' | 'language'

export type QuestionTag = 'local' | 'classic' | 'current' | 'chat' | 'odd' | 'nostalgia'

/** Visual question formats. A category tile can advertise one of them per turn. */
export type VisualKind = 'emoji' | 'doodle' | 'trend' | 'swatch' | 'silhouette' | 'quartet' | 'pin' | 'pixel' | 'flag' | 'phrase'

/** Longitude, latitude in degrees. */
export type GeoPoint = readonly [number, number]

export type QuestionMedia =
  /** A short emoji sequence that encodes the answer. */
  | { kind: 'emoji', symbols: string }
  /** A deliberately crude line drawing; paths are stroked, never filled. */
  | { kind: 'doodle', viewBox: string, paths: readonly string[] }
  /** Monthly search interest (0–100), starting in January of `from`. */
  | { kind: 'trend', from: number, values: readonly number[] }
  /** The four options are hex colours; `reveal` names the correct one for the answer line. */
  | { kind: 'swatch', reveal: string }
  /**
   * A filled outline that starts zoomed in and pulls back while the timer runs. Either a
   * generated geo shape or a hand-drawn path. `focus` is the zoom origin as 0–1 fractions.
   */
  | { kind: 'silhouette', shape: GeoShapeId, focus?: readonly [number, number] }
  | { kind: 'silhouette', viewBox: string, path: string, focus?: readonly [number, number] }
  /** A trump card with 3–5 stats; the name on the card is the answer. */
  | { kind: 'quartet', heading: string, stats: readonly { label: string, value: string }[] }
  /** A pin on a map; `reference` adds a labelled second pin for orientation. */
  | { kind: 'pin', map: GeoMapId, at: GeoPoint, reference?: { label: string, at: GeoPoint } }
  /** Pixel art: one character per pixel, keyed into `palette`; '.' stays empty. Pixels appear over the timer. */
  | { kind: 'pixel', palette: Readonly<Record<string, string>>, rows: readonly string[] }
  /**
   * Flags as `FlagSpec` strings: an ISO 3166-1 alpha-2 code, optionally followed by colour
   * swaps (`de|FFCE00>2E7D32`) and/or `|mirror`. With `show`, one flag sits above text
   * options; without it, the four options are FlagSpecs and `reveal` names the right one.
   */
  | { kind: 'flag', show: string }
  | { kind: 'flag', reveal: string }
  /** A short text shown big like a sign, e.g. a sentence in a foreign language; `note` appears after the answer. */
  | { kind: 'phrase', text: string, note?: string }

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
  /** Estimation question: both teams enter a number, the closer one scores. Options are unused. */
  estimate?: { value: number, unit: string }
}

export interface TieQuestion {
  question: string
  answer: number
}
