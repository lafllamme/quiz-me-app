import { describe, expect, it } from 'vitest'
import { CATALOG_STATS, MIN_QUESTIONS_PER_DIFFICULTY, QUESTIONS, QUIZ_CATEGORIES } from '~/data/quiz-catalog'

describe('quiz catalog', () => {
  it('contains a deep pool for every category and difficulty', () => {
    expect(new Set(QUESTIONS.map(question => question.id)).size).toBe(QUESTIONS.length)

    for (const category of QUIZ_CATEGORIES) {
      const stats = CATALOG_STATS[category.id]
      expect(stats.easy).toBeGreaterThanOrEqual(MIN_QUESTIONS_PER_DIFFICULTY)
      expect(stats.medium).toBeGreaterThanOrEqual(MIN_QUESTIONS_PER_DIFFICULTY)
      expect(stats.hard).toBeGreaterThanOrEqual(MIN_QUESTIONS_PER_DIFFICULTY)
      expect(stats.total).toBe(stats.easy + stats.medium + stats.hard)
    }
  })

  it('keeps every answer valid and selectable', () => {
    for (const question of QUESTIONS) {
      expect(question.options).toHaveLength(4)
      expect(new Set(question.options).size).toBe(4)
      expect(question.options[question.correctIndex]).toBe(question.answer)
      expect(question.category).toBeDefined()
      expect(question.categoryId).toBeDefined()
    }
  })

  it('does not ask the same question twice', () => {
    const texts = QUESTIONS.map(question => question.question.trim().toLowerCase())
    expect(new Set(texts).size).toBe(texts.length)
  })
})
