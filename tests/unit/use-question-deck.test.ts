import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DIFFICULTY_WEIGHTS, QUESTION_HISTORY_KEY, useQuestionDeck } from '~/composables/useQuestionDeck'

describe('useQuestionDeck', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('hydrates known answered ids and ignores duplicates or stale ids', () => {
    localStorage.setItem(QUESTION_HISTORY_KEY, JSON.stringify(['cologne-e-01', 'cologne-e-01', 'removed-question']))

    const deck = useQuestionDeck()
    deck.hydrate()

    expect(deck.answeredCount.value).toBe(1)
    expect(deck.remainingCount.value).toBe(89)
    expect(deck.isAnswered('cologne-e-01')).toBe(true)
    expect(deck.isAnswered('removed-question')).toBe(false)
  })

  it('persists a question only when it is marked answered', () => {
    const deck = useQuestionDeck()
    deck.hydrate()

    const question = deck.pickQuestion('Köln', 'mixed')
    expect(question).toBeDefined()
    expect(deck.answeredCount.value).toBe(0)

    deck.markAnswered(question!.id)

    expect(deck.answeredCount.value).toBe(1)
    expect(JSON.parse(localStorage.getItem(QUESTION_HISTORY_KEY) || '[]')).toContain(question!.id)
    expect(deck.getAvailableQuestions()).not.toContainEqual(question)
  })

  it('does not select answered or currently used questions again', () => {
    const deck = useQuestionDeck()
    deck.hydrate()
    deck.markAnswered('music-e-01')

    const next = deck.pickQuestion('Musik', 'mixed', ['music-e-02'])

    expect(next).toBeDefined()
    expect(next?.id).not.toBe('music-e-01')
    expect(next?.id).not.toBe('music-e-02')
  })

  it('uses the configured difficulty weighting at the selection boundaries', () => {
    expect(DIFFICULTY_WEIGHTS.easy).toEqual({ 1: 70, 2: 25, 3: 5 })
    expect(DIFFICULTY_WEIGHTS.mixed).toEqual({ 1: 33, 2: 34, 3: 33 })
    expect(DIFFICULTY_WEIGHTS.hard).toEqual({ 1: 10, 2: 30, 3: 60 })

    const deck = useQuestionDeck()
    deck.hydrate()

    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    expect(deck.pickQuestion('Wissen', 'hard')?.difficulty).toBe(3)

    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(deck.pickQuestion('Wissen', 'easy')?.difficulty).toBe(1)
  })

  it('can reset the archive after the pool is exhausted', () => {
    const deck = useQuestionDeck()
    deck.hydrate()
    deck.markAnswered('cologne-e-01')

    deck.resetHistory()

    expect(deck.answeredCount.value).toBe(0)
    expect(deck.remainingCount.value).toBe(90)
    expect(localStorage.getItem(QUESTION_HISTORY_KEY)).toBeNull()
  })
})
