import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BOARD_SIZE, CATEGORY_EXPOSURE_KEY, DIFFICULTY_WEIGHTS, MAX_VISUAL_TILES, MIN_VISUAL_TILES, QUESTION_HISTORY_KEY, arrangeOptions, chooseCorrectPosition, orderByExposure, useQuestionDeck } from '~/composables/useQuestionDeck'
import { QUESTIONS, QUIZ_CATEGORIES } from '~/data/quiz-catalog'

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
    expect(deck.remainingCount.value).toBe(QUESTIONS.length - 1)
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
    expect(DIFFICULTY_WEIGHTS.mixed).toEqual({ 1: 25, 2: 35, 3: 40 })
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
    expect(deck.remainingCount.value).toBe(QUESTIONS.length)
    expect(localStorage.getItem(QUESTION_HISTORY_KEY)).toBeNull()
  })

  it('moves the answer to the requested slot and keeps every option', () => {
    const question = QUESTIONS[0]!

    for (const position of [0, 1, 2, 3]) {
      const arranged = arrangeOptions(question, position)
      expect(arranged.correctIndex).toBe(position)
      expect(arranged.options[position]).toBe(question.answer)
      expect([...arranged.options].sort()).toEqual([...question.options].sort())
    }
  })

  it('never repeats the previous answer slot and spreads answers across all letters', () => {
    const positions: number[] = []
    for (let index = 0; index < 400; index++)
      positions.push(chooseCorrectPosition(positions))

    for (let index = 1; index < positions.length; index++)
      expect(positions[index]).not.toBe(positions[index - 1])

    for (const slot of [0, 1, 2, 3]) {
      const share = positions.filter(position => position === slot).length / positions.length
      expect(share).toBeGreaterThan(0.15)
      expect(share).toBeLessThan(0.35)
    }
  })

  it('presents questions with shuffled options without touching the catalog entry', () => {
    const deck = useQuestionDeck()
    const question = QUESTIONS[0]!
    const original = [...question.options]

    const presented = deck.presentQuestion(question)

    expect(presented.options[presented.correctIndex]).toBe(question.answer)
    expect(question.options).toEqual(original)
  })

  it('keeps plain tiles to text questions and visual tiles to their format', () => {
    const deck = useQuestionDeck()
    deck.hydrate()

    for (let index = 0; index < 20; index++)
      expect(deck.pickQuestion('Film & Serie', 'mixed')?.media).toBeUndefined()

    const [kind] = deck.getVisualKinds('Film & Serie')
    expect(kind).toBeDefined()
    expect(deck.pickQuestion('Film & Serie', 'mixed', [], kind!)?.media?.kind).toBe(kind)
  })

  it('always fills the board to six tiles while the last category rests', () => {
    const deck = useQuestionDeck()
    deck.hydrate()

    for (let round = 0; round < 50; round++) {
      const tiles = deck.planBoard([], 'Musik', 'trend')
      const kinds = tiles.map(tile => tile.visual).filter(Boolean)

      expect(tiles).toHaveLength(BOARD_SIZE)
      expect(tiles.map(tile => tile.category)).not.toContain('Musik')
      expect(kinds).not.toContain('trend')
      expect(kinds.length).toBeLessThanOrEqual(MAX_VISUAL_TILES)
      expect(new Set(kinds).size).toBe(kinds.length)
      expect(new Set(tiles.map(tile => `${tile.category}-${tile.visual}`)).size).toBe(BOARD_SIZE)
      for (const tile of tiles) {
        if (tile.visual)
          expect(deck.getVisualKinds(tile.category)).toContain(tile.visual)
      }
    }
  })

  it('puts at least the minimum number of visual tiles on a fresh board', () => {
    const deck = useQuestionDeck()
    deck.hydrate()

    vi.spyOn(Math, 'random').mockReturnValue(0)
    const tiles = deck.planBoard()

    expect(tiles).toHaveLength(BOARD_SIZE)
    expect(tiles.filter(tile => tile.visual).length).toBeGreaterThanOrEqual(MIN_VISUAL_TILES)
    const labels = QUIZ_CATEGORIES.map(category => category.label)
    expect(new Set(tiles.map(tile => tile.category)).size).toBe(BOARD_SIZE)
    expect(tiles.every(tile => labels.includes(tile.category))).toBe(true)
  })

  it('orders rarely shown categories first', () => {
    const firsts = { A: 0, B: 0, C: 0 }
    for (let draw = 0; draw < 2000; draw++)
      firsts[orderByExposure(['A', 'B', 'C'], { A: 5, B: 0, C: 2 })[0] as keyof typeof firsts]++

    expect(firsts.B).toBeGreaterThan(firsts.C)
    expect(firsts.C).toBeGreaterThan(firsts.A)
  })

  it('spreads categories evenly across boards and remembers the balance', () => {
    const deck = useQuestionDeck()
    deck.hydrate()
    const offered = new Map<string, number>()

    for (let round = 0; round < 70; round++) {
      for (const tile of deck.planBoard())
        offered.set(tile.category, (offered.get(tile.category) ?? 0) + 1)
    }

    const counts = QUIZ_CATEGORIES.map(category => offered.get(category.label) ?? 0)
    // 70 boards × 6 tiles over 14 categories is 30 each; uniform random would scatter far wider.
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(10)
    expect(JSON.parse(localStorage.getItem(CATEGORY_EXPOSURE_KEY) || '{}')).not.toEqual({})
  })
})
