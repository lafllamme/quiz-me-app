import type { SniperCategoryId } from '~/data/sniper-sounds.types'

export type DifficultyMode = 'easy' | 'mixed' | 'hard'

export type GameMode = 'quiz' | 'sniper'

export type SetupDraft = {
  names: [string, string]
  players: [string, string]
  rounds: number
  seconds: number
  difficulty: DifficultyMode
  sniperRounds: number
  sniperSeconds: number
  sniperCategories: SniperCategoryId[]
}
