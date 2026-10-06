import { describe, expect, it } from 'vitest'
import { CATALOG_STATS, QUESTIONS, QUIZ_CATEGORIES } from '~/data/quiz-catalog'

describe('quiz catalog', () => {
  it('contains a balanced pool of 90 questions', () => {
    expect(QUESTIONS).toHaveLength(90)
    expect(new Set(QUESTIONS.map(question => question.id)).size).toBe(90)

    for (const category of QUIZ_CATEGORIES) {
      expect(CATALOG_STATS[category.id]).toEqual({ total: 15, easy: 5, medium: 5, hard: 5 })
    }
  })

  it('keeps every answer valid and selectable', () => {
    for (const question of QUESTIONS) {
      expect(question.options).toHaveLength(4)
      expect(question.options[question.correctIndex]).toBe(question.answer)
      expect(question.category).toBeDefined()
      expect(question.categoryId).toBeDefined()
    }
  })
})
