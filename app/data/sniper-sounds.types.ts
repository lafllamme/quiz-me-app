export type SniperCategoryId = 'animals' | 'everyday' | 'nature' | 'tech' | 'gaming' | 'show' | 'human'

export interface SniperCredit {
  author: string
  source: string
  license: string
}

/** One sound for Sound Sniper. Adding a file plus one entry is all a new sound needs. */
export interface SniperSound {
  id: string
  /** The solution as shown on the reveal. Never rendered before that. */
  answer: string
  /** Other names the host may accept as correct. */
  aliases?: string[]
  category: SniperCategoryId
  /** Path below /public, e.g. /sounds/sniper/everyday/toilet-flush.mp3 */
  src: string
  /** Measured length; the player still reads the real duration from the file's metadata. */
  durationSeconds?: number
  credit: SniperCredit
}

export const SNIPER_CATEGORIES: { id: SniperCategoryId, label: string }[] = [
  { id: 'animals', label: 'Tiere' },
  { id: 'everyday', label: 'Alltag' },
  { id: 'nature', label: 'Natur & Wetter' },
  { id: 'tech', label: 'Technik & Verkehr' },
  { id: 'gaming', label: 'Games & Arcade' },
  { id: 'show', label: 'Show & Musik' },
  { id: 'human', label: 'Mensch' },
]

export function sniperCategoryLabel(id: SniperCategoryId) {
  return SNIPER_CATEGORIES.find(category => category.id === id)?.label ?? id
}
