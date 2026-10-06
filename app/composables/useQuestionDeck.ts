import { computed, ref } from 'vue'
import { QUESTIONS, type DifficultyLevel, type QuizQuestion, type VisualKind } from '~/data/quiz-catalog'
import type { DifficultyMode } from '~/types/setup'

export const QUESTION_HISTORY_KEY = 'jungle-question-history-v1'

export const DIFFICULTY_WEIGHTS: Record<DifficultyMode, Record<DifficultyLevel, number>> = {
  easy: { 1: 70, 2: 25, 3: 5 },
  mixed: { 1: 33, 2: 34, 3: 33 },
  hard: { 1: 10, 2: 30, 3: 60 },
}

/** The board always aims for this many tiles. */
export const BOARD_SIZE = 6

/** Upper bound of tiles that carry a visual question in one turn. */
export const MAX_VISUAL_TILES = 4

/** One pick on the category board: a category, optionally bound to a visual format. */
export interface CategoryTile {
  category: string
  visual: VisualKind | null
}

/** How many recent correct-answer slots are remembered when placing the next one. */
const POSITION_MEMORY = 6

function randomItem<T>(items: readonly T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)]
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swap]] = [result[swap]!, result[index]!]
  }
  return result
}

/**
 * Picks the slot for the next correct answer. The previous slot is never repeated and
 * slots that were used often in the recent window become increasingly unlikely, so the
 * answer letter stays unpredictable without following a visible pattern.
 */
export function chooseCorrectPosition(recentPositions: readonly number[], optionCount = 4): number {
  const last = recentPositions.at(-1)
  const recent = recentPositions.slice(-POSITION_MEMORY)
  const positions = Array.from({ length: optionCount }, (_, index) => index).filter(index => index !== last)
  const weights = positions.map(position => 1 / (1 + recent.filter(used => used === position).length) ** 2)
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  let cursor = Math.random() * totalWeight
  for (const [index, position] of positions.entries()) {
    cursor -= weights[index]!
    if (cursor < 0)
      return position
  }

  return positions.at(-1)!
}

/** Returns a copy of the question with the answer at `correctPosition` and shuffled distractors. */
export function arrangeOptions(question: QuizQuestion, correctPosition: number): QuizQuestion {
  const options = shuffle(question.options.filter((_, index) => index !== question.correctIndex))
  options.splice(correctPosition, 0, question.answer)

  return {
    ...question,
    options: options as unknown as QuizQuestion['options'],
    correctIndex: correctPosition,
  }
}

function chooseDifficulty(candidates: readonly QuizQuestion[], mode: DifficultyMode): DifficultyLevel | undefined {
  const levels = [...new Set(candidates.map(question => question.difficulty))]
  const weights = DIFFICULTY_WEIGHTS[mode]
  const totalWeight = levels.reduce((sum, level) => sum + weights[level], 0)

  if (!totalWeight)
    return randomItem(levels)

  let cursor = Math.random() * totalWeight
  for (const level of levels) {
    cursor -= weights[level]
    if (cursor < 0)
      return level
  }

  return levels.at(-1)
}

export function useQuestionDeck() {
  const answeredIds = ref<string[]>([])
  const hydrated = ref(false)
  const recentCorrectPositions: number[] = []

  const knownQuestionIds = new Set(QUESTIONS.map(question => question.id))
  const totalCount = computed(() => QUESTIONS.length)
  const answeredCount = computed(() => answeredIds.value.length)
  const remainingCount = computed(() => Math.max(0, totalCount.value - answeredCount.value))
  const isExhausted = computed(() => remainingCount.value === 0)

  function hydrate() {
    if (hydrated.value || import.meta.server)
      return

    try {
      const saved = JSON.parse(localStorage.getItem(QUESTION_HISTORY_KEY) || '[]')
      const ids = Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : []
      answeredIds.value = [...new Set(ids.filter(id => knownQuestionIds.has(id)))]
    }
    catch {
      answeredIds.value = []
    }

    hydrated.value = true
  }

  function persist() {
    if (import.meta.server)
      return
    localStorage.setItem(QUESTION_HISTORY_KEY, JSON.stringify(answeredIds.value))
  }

  function isAnswered(id: string) {
    return answeredIds.value.includes(id)
  }

  function markAnswered(id: string) {
    if (!knownQuestionIds.has(id) || isAnswered(id))
      return
    answeredIds.value.push(id)
    persist()
  }

  function resetHistory() {
    answeredIds.value = []
    if (!import.meta.server)
      localStorage.removeItem(QUESTION_HISTORY_KEY)
  }

  function getAvailableQuestions(excludedIds: readonly string[] = []) {
    const excluded = new Set(excludedIds)
    return QUESTIONS.filter(question => !isAnswered(question.id) && !excluded.has(question.id))
  }

  function getAvailableCategories(excludedIds: readonly string[] = []) {
    return [...new Set(getAvailableQuestions(excludedIds).map(question => question.category))]
  }

  function getVisualKinds(category: string, excludedIds: readonly string[] = []) {
    const kinds = getAvailableQuestions(excludedIds)
      .filter(question => question.category === category && question.media)
      .map(question => question.media!.kind)
    return [...new Set(kinds)]
  }

  /**
   * Builds the board for one turn. The category and format played last turn rest, then
   * 0–MAX_VISUAL_TILES tiles get a distinct visual format. A rested category leaves a gap,
   * which an extra visual tile from another category fills, so the board stays at
   * BOARD_SIZE whenever the catalog still allows it.
   */
  function planBoard(excludedIds: readonly string[] = [], restingCategory: string | null = null, restingKind: VisualKind | null = null): CategoryTile[] {
    const available = getAvailableCategories(excludedIds)
    const rested = available.filter(category => category !== restingCategory)
    const pool = shuffle(rested.length ? rested : available)
    const tiles: CategoryTile[] = pool.slice(0, BOARD_SIZE).map(category => ({ category, visual: null }))

    const usedKinds = new Set<VisualKind>(restingKind ? [restingKind] : [])
    const nextKind = (category: string) => shuffle(getVisualKinds(category, excludedIds)).find(kind => !usedKinds.has(kind))

    // Formats are unique per board, so keep enough of them free to fill every gap.
    const gaps = BOARD_SIZE - tiles.length
    const freeKinds = new Set(pool.flatMap(category => getVisualKinds(category, excludedIds)).filter(kind => !usedKinds.has(kind)))
    const overlayBudget = Math.max(0, Math.min(MAX_VISUAL_TILES, freeKinds.size) - gaps)
    const overlayTarget = Math.min(Math.floor(Math.random() * (MAX_VISUAL_TILES + 1)), overlayBudget)
    let overlays = 0
    for (const tile of shuffle(tiles)) {
      if (overlays >= overlayTarget)
        break
      const kind = nextKind(tile.category)
      if (!kind)
        continue
      tile.visual = kind
      usedKinds.add(kind)
      overlays++
    }

    // Fill gaps with extra visual tiles, preferring categories whose tile is still plain.
    const plainFirst = [...pool].sort((a, b) => Number(tiles.some(tile => tile.category === a && tile.visual)) - Number(tiles.some(tile => tile.category === b && tile.visual)))
    for (const category of plainFirst) {
      if (tiles.length >= BOARD_SIZE)
        break
      const kind = nextKind(category)
      if (!kind)
        continue
      tiles.splice(Math.floor(Math.random() * (tiles.length + 1)), 0, { category, visual: kind })
      usedKinds.add(kind)
    }

    return tiles
  }

  /** `visual` picks a question of that format; `null` keeps to plain text questions when any are left. */
  function pickQuestion(category: string, mode: DifficultyMode, excludedIds: readonly string[] = [], visual: VisualKind | null = null) {
    const inCategory = getAvailableQuestions(excludedIds).filter(question => question.category === category)
    const matching = inCategory.filter(question => visual ? question.media?.kind === visual : !question.media)
    const candidates = matching.length ? matching : inCategory
    if (!candidates.length)
      return undefined

    const selectedDifficulty = chooseDifficulty(candidates, mode)
    const difficultyPool = selectedDifficulty
      ? candidates.filter(question => question.difficulty === selectedDifficulty)
      : candidates

    return randomItem(difficultyPool) ?? randomItem(candidates)
  }

  /** Shuffles the options for display while spreading the correct answer across A–D. */
  function presentQuestion(question: QuizQuestion) {
    const position = chooseCorrectPosition(recentCorrectPositions, question.options.length)
    recentCorrectPositions.push(position)
    recentCorrectPositions.splice(0, Math.max(0, recentCorrectPositions.length - POSITION_MEMORY))
    return arrangeOptions(question, position)
  }

  return {
    answeredIds,
    hydrated,
    totalCount,
    answeredCount,
    remainingCount,
    isExhausted,
    hydrate,
    isAnswered,
    markAnswered,
    resetHistory,
    getAvailableQuestions,
    getAvailableCategories,
    getVisualKinds,
    planBoard,
    pickQuestion,
    presentQuestion,
  }
}
