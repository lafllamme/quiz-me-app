import { computed, ref } from 'vue'
import { QUESTIONS, type DifficultyLevel, type QuizQuestion } from '~/data/quiz-catalog'
import type { DifficultyMode } from '~/types/setup'

export const QUESTION_HISTORY_KEY = 'jungle-question-history-v1'

export const DIFFICULTY_WEIGHTS: Record<DifficultyMode, Record<DifficultyLevel, number>> = {
  easy: { 1: 70, 2: 25, 3: 5 },
  mixed: { 1: 33, 2: 34, 3: 33 },
  hard: { 1: 10, 2: 30, 3: 60 },
}

function randomItem<T>(items: readonly T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)]
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

  function pickQuestion(category: string, mode: DifficultyMode, excludedIds: readonly string[] = []) {
    const candidates = getAvailableQuestions(excludedIds).filter(question => question.category === category)
    if (!candidates.length)
      return undefined

    const selectedDifficulty = chooseDifficulty(candidates, mode)
    const difficultyPool = selectedDifficulty
      ? candidates.filter(question => question.difficulty === selectedDifficulty)
      : candidates

    return randomItem(difficultyPool) ?? randomItem(candidates)
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
    pickQuestion,
  }
}
