import { describe, expect, it } from 'vitest'
import type { SniperCategoryId, SniperSound } from '~/data/sniper-sounds.types'
import {
  advance,
  buzz,
  drinkingTeam,
  emptySniperState,
  expire,
  judge,
  loadSound,
  maxPlaysFor,
  openListening,
  pickSound,
  startCountdown,
  undoBuzz,
  type SniperState,
} from '~/lib/sniper-machine'

const sound = (id: string, category: SniperCategoryId = 'animals'): SniperSound => ({
  id,
  answer: id,
  category,
  src: `/sounds/sniper/${category}/${id}.mp3`,
  credit: { author: 'test', source: 'test', license: 'CC0 1.0' },
})

function listening(total = 4): SniperState {
  const state = emptySniperState(total)
  loadSound(state, sound('dog'))
  startCountdown(state)
  openListening(state)
  return state
}

describe('maxPlaysFor', () => {
  it('allows two listens up to three seconds and one above', () => {
    expect(maxPlaysFor(1.2)).toBe(2)
    expect(maxPlaysFor(3)).toBe(2)
    expect(maxPlaysFor(3.01)).toBe(1)
    expect(maxPlaysFor(9)).toBe(1)
  })

  it('treats an unknown length as long', () => {
    expect(maxPlaysFor(null)).toBe(1)
    expect(maxPlaysFor(Number.NaN)).toBe(1)
    expect(maxPlaysFor(Number.POSITIVE_INFINITY)).toBe(1)
  })
})

describe('buzzing', () => {
  it('ignores buzzes before the sound round opens', () => {
    const state = emptySniperState(4)
    loadSound(state, sound('dog'))
    expect(buzz(state, 0)).toBe(false)
    startCountdown(state)
    expect(buzz(state, 1)).toBe(false)
    expect(state.buzzer).toBeNull()
  })

  it('locks the round to the first team', () => {
    const state = listening()
    expect(buzz(state, 1)).toBe(true)
    expect(buzz(state, 0)).toBe(false)
    expect(state.buzzer).toBe(1)
    expect(state.phase).toBe('buzzed')
  })

  it('reopens the round when the host takes the buzz back', () => {
    const state = listening()
    buzz(state, 0)
    expect(undoBuzz(state)).toBe(true)
    expect(state.phase).toBe('listening')
    expect(buzz(state, 1)).toBe(true)
  })
})

describe('scoring', () => {
  it('gives a right answer to the buzzing team and the drink to the other', () => {
    const state = listening()
    buzz(state, 0)
    judge(state, true)
    expect(state.scores).toEqual([1, 0])
    expect(state.outcome).toBe('right')
    expect(drinkingTeam(state)).toBe(1)
  })

  it('hands the point straight to the other team on a wrong answer', () => {
    const state = listening()
    buzz(state, 0)
    judge(state, false)
    expect(state.scores).toEqual([0, 1])
    expect(state.outcome).toBe('wrong')
    expect(drinkingTeam(state)).toBe(0)
  })

  it('scores nobody when time runs out', () => {
    const state = listening()
    expect(expire(state)).toBe(true)
    expect(state.scores).toEqual([0, 0])
    expect(drinkingTeam(state)).toBeNull()
  })

  it('judges only once', () => {
    const state = listening()
    buzz(state, 0)
    judge(state, true)
    expect(judge(state, true)).toBe(false)
    expect(expire(state)).toBe(false)
    expect(state.scores).toEqual([1, 0])
    expect(state.history).toHaveLength(1)
  })
})

describe('advance', () => {
  function play(state: SniperState, team: 0 | 1, correct: boolean) {
    loadSound(state, sound(`s${state.index}`))
    startCountdown(state)
    openListening(state)
    buzz(state, team)
    judge(state, correct)
    return advance(state)
  }

  it('ends after the last sound when the scores differ', () => {
    const state = emptySniperState(2)
    expect(play(state, 0, true)).toBe('next')
    expect(play(state, 0, true)).toBe('final')
    expect(state.phase).toBe('final')
  })

  it('goes to a deciding sound on a level score and ends on the first point', () => {
    const state = emptySniperState(2)
    play(state, 0, true)
    expect(play(state, 1, true)).toBe('next')
    expect(state.suddenDeath).toBe(true)

    loadSound(state, sound('decider'))
    startCountdown(state)
    openListening(state)
    expire(state)
    expect(advance(state)).toBe('next')

    expect(play(state, 1, false)).toBe('final')
    expect(state.scores).toEqual([2, 1])
  })
})

describe('pickSound', () => {
  it('never repeats an excluded sound and returns null when the pool is spent', () => {
    const pool = [sound('a'), sound('b')]
    expect(pickSound(pool, new Set(['a']), [])?.id).toBe('b')
    expect(pickSound(pool, new Set(['a', 'b']), [])).toBeNull()
  })

  it('takes the least used category next', () => {
    const pool = [sound('dog', 'animals'), sound('cat', 'animals'), sound('flush', 'everyday')]
    const history = [{ soundId: 'cow', category: 'animals' as const, buzzer: null, winner: null, outcome: 'timeout' as const }]
    for (let run = 0; run < 20; run++)
      expect(pickSound(pool, new Set(), history)?.category).toBe('everyday')
  })
})
