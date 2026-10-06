export type DifficultyMode = 'easy' | 'mixed' | 'hard'

export type SetupDraft = {
  names: [string, string]
  players: [string, string]
  rounds: number
  seconds: number
  difficulty: DifficultyMode
}
