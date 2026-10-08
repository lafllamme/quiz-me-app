/**
 * Static match state for the Sound Sniper design lab (/sniper-lab).
 * Illustrative values only; nothing here is read by the real game.
 */

export type LabTeam = 0 | 1
export type LabOutcome = 'right' | 'wrong' | 'timeout'

export interface LabVariant {
  code: string
  label: string
  note: string
  recommended?: boolean
}

export const labMatch = {
  names: ['Dogi', 'Quizzly Bears'] as [string, string],
  scores: [2, 1] as [number, number],
  sound: 4,
  total: 10,
  round: 2,
  rounds: 5,
  seconds: 15,
  plays: 1,
  maxPlays: 3,
  /** Seconds left on the clock when the buzzer went. */
  buzzedAt: 9,
}

export const labCategories = [
  { label: 'Tiere', on: true },
  { label: 'Alltag', on: true },
  { label: 'Natur & Wetter', on: true },
  { label: 'Technik & Verkehr', on: true },
  { label: 'Games & Arcade', on: false },
  { label: 'Show & Musik', on: true },
  { label: 'Mensch', on: true },
]

const sounds: Record<LabOutcome, { answer: string, category: string, credit: string }> = {
  right: { answer: 'Bach', category: 'Natur & Wetter', credit: 'Sound: InspectorJ · freesound.org · CC BY 4.0' },
  wrong: { answer: 'Kettensäge', category: 'Technik & Verkehr', credit: 'Sound: Zapsplat · CC0' },
  timeout: { answer: 'Toilettenspülung', category: 'Alltag', credit: 'Sound: Mixkit · freie Lizenz' },
}

export interface LabResult {
  outcome: LabOutcome
  answer: string
  category: string
  credit: string
  title: string
  line: string
  winner: LabTeam | null
  drinker: LabTeam | null
  scores: [number, number]
}

export const otherTeam = (team: LabTeam) => (1 - team) as LabTeam

/** What the result screen says for an outcome, given which team buzzed. */
export function labResult(outcome: LabOutcome, buzzer: LabTeam): LabResult {
  const { names } = labMatch
  const scores = [...labMatch.scores] as [number, number]
  const sound = sounds[outcome]
  if (outcome === 'right') {
    scores[buzzer] += 1
    return { outcome, ...sound, title: 'Richtig!', line: `+1 für ${names[buzzer]}`, winner: buzzer, drinker: otherTeam(buzzer), scores }
  }
  if (outcome === 'wrong') {
    const winner = otherTeam(buzzer)
    scores[winner] += 1
    return { outcome, ...sound, title: 'Daneben!', line: `+1 für ${names[winner]}`, winner, drinker: buzzer, scores }
  }
  return { outcome, ...sound, title: 'Zeit vorbei', line: 'Keine Punkte', winner: null, drinker: null, scores }
}

/** The reveal shown while judging uses the "right" sound so the answer reads "Bach". */
export const labRevealAnswer = sounds.right.answer
export const labRevealCategory = sounds.right.category
