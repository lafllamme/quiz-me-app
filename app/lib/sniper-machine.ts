import type { SniperCategoryId, SniperSound } from '~/data/sniper-sounds.types'

/**
 * Sound Sniper rules without timers or audio, so every transition is testable.
 * Each function checks the phase first; a call in the wrong phase is a no-op that returns false.
 * That is what makes double key presses and late buzzes harmless.
 */

export type SniperPhase = 'ready' | 'countdown' | 'listening' | 'buzzed' | 'resolved' | 'final'
export type SniperOutcome = 'right' | 'wrong' | 'timeout'
export type Team = 0 | 1

export interface SniperRecord {
  soundId: string
  category: SniperCategoryId
  buzzer: Team | null
  winner: Team | null
  outcome: SniperOutcome
}

export interface SniperState {
  phase: SniperPhase
  scores: [number, number]
  /** Zero-based number of the current sound. */
  index: number
  total: number
  /** Scores were level after the last regular sound; the next decided sound wins. */
  suddenDeath: boolean
  current: SniperSound | null
  buzzer: Team | null
  winner: Team | null
  outcome: SniperOutcome | null
  /** Sound ids drawn in this game, including skipped ones. */
  played: string[]
  history: SniperRecord[]
}

/** Short sounds may be heard twice, longer ones once. Unknown length counts as long. */
export const SHORT_SOUND_SECONDS = 3

export function maxPlaysFor(duration: number | null | undefined) {
  return duration && Number.isFinite(duration) && duration <= SHORT_SOUND_SECONDS ? 2 : 1
}

export function emptySniperState(total = 0): SniperState {
  return {
    phase: 'ready',
    scores: [0, 0],
    index: 0,
    total,
    suddenDeath: false,
    current: null,
    buzzer: null,
    winner: null,
    outcome: null,
    played: [],
    history: [],
  }
}

/**
 * Draws an unplayed sound. Categories rotate: the least used category of this game goes next,
 * so a mixed game never runs five animals in a row.
 */
export function pickSound(pool: SniperSound[], exclude: ReadonlySet<string>, history: SniperRecord[], random = Math.random): SniperSound | null {
  const available = pool.filter(sound => !exclude.has(sound.id))
  if (!available.length)
    return null

  const uses = new Map<SniperCategoryId, number>()
  history.forEach(record => uses.set(record.category, (uses.get(record.category) ?? 0) + 1))
  const categories = [...new Set(available.map(sound => sound.category))]
  const fewest = Math.min(...categories.map(category => uses.get(category) ?? 0))
  const candidates = categories.filter(category => (uses.get(category) ?? 0) === fewest)
  const category = candidates[Math.floor(random() * candidates.length)]!
  const sounds = available.filter(sound => sound.category === category)
  return sounds[Math.floor(random() * sounds.length)]!
}

/** Puts a freshly drawn sound on the stage, waiting for the host to start it. */
export function loadSound(state: SniperState, sound: SniperSound) {
  state.current = sound
  state.phase = 'ready'
  state.buzzer = null
  state.winner = null
  state.outcome = null
  if (!state.played.includes(sound.id))
    state.played.push(sound.id)
}

export function startCountdown(state: SniperState) {
  if (state.phase !== 'ready' || !state.current)
    return false
  state.phase = 'countdown'
  return true
}

export function openListening(state: SniperState) {
  if (state.phase !== 'countdown')
    return false
  state.phase = 'listening'
  return true
}

/** Only the first buzz while the sound round is open counts. */
export function buzz(state: SniperState, team: Team) {
  if (state.phase !== 'listening')
    return false
  state.buzzer = team
  state.phase = 'buzzed'
  return true
}

/** The host pressed the wrong team key: reopen the round. */
export function undoBuzz(state: SniperState) {
  if (state.phase !== 'buzzed')
    return false
  state.buzzer = null
  state.phase = 'listening'
  return true
}

function resolve(state: SniperState, winner: Team | null, outcome: SniperOutcome) {
  state.phase = 'resolved'
  state.winner = winner
  state.outcome = outcome
  if (winner !== null)
    state.scores[winner]++
  if (state.current) {
    state.history.push({
      soundId: state.current.id,
      category: state.current.category,
      buzzer: state.buzzer,
      winner,
      outcome,
    })
  }
}

/** Right: the buzzing team scores. Wrong: the other team scores straight away, no second guess. */
export function judge(state: SniperState, correct: boolean) {
  if (state.phase !== 'buzzed' || state.buzzer === null)
    return false
  const winner = correct ? state.buzzer : (1 - state.buzzer) as Team
  resolve(state, winner, correct ? 'right' : 'wrong')
  return true
}

/** Nobody buzzed in time: no points. */
export function expire(state: SniperState) {
  if (state.phase !== 'listening')
    return false
  resolve(state, null, 'timeout')
  return true
}

/** The host drops the current sound (broken, unfair, known). Nobody scores and it does not count. */
export function canSkip(state: SniperState) {
  return state.phase === 'ready' || state.phase === 'countdown' || state.phase === 'listening' || state.phase === 'buzzed'
}

/** Moves past a resolved sound. Returns 'final' when the game is decided, otherwise 'next'. */
export function advance(state: SniperState): 'next' | 'final' | false {
  if (state.phase !== 'resolved')
    return false

  const level = state.scores[0] === state.scores[1]
  state.index++
  if (state.suddenDeath ? !level : state.index >= state.total && !level) {
    state.phase = 'final'
    return 'final'
  }
  if (state.index >= state.total)
    state.suddenDeath = true
  return 'next'
}

/** Who drinks after a resolved sound: the team that lost the point. */
export function drinkingTeam(state: Pick<SniperState, 'winner'>): Team | null {
  return state.winner === null ? null : (1 - state.winner) as Team
}
