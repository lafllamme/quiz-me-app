import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { FLAG_SPEC, paintFlag, parseFlagSpec } from '~/utils/flag-spec'
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
    const texts = QUESTIONS.map(question => `${question.question.trim().toLowerCase()}|${question.answer.toLowerCase()}`)
    expect(new Set(texts).size).toBe(texts.length)
  })
})

describe('flag questions', () => {
  const flagSpecs = QUESTIONS.flatMap((question) => {
    const media = question.media
    if (media?.kind !== 'flag')
      return []
    return 'show' in media ? [media.show] : [...question.options]
  })

  it('only uses flags that exist and colours that are really in them', () => {
    for (const raw of flagSpecs) {
      const spec = parseFlagSpec(raw)
      const file = resolve(process.cwd(), `node_modules/flag-icons/flags/4x3/${spec.code}.svg`)
      expect(existsSync(file), raw).toBe(true)
      const svg = readFileSync(file, 'utf8')
      for (const { from } of spec.swaps)
        expect(paintFlag(svg, { ...spec, swaps: [{ from, to: '123456' }] }, 'test'), `${raw}: ${from}`).toContain('#123456')
    }
  })
})

describe('flag specs', () => {
  it('parses codes, colour swaps and mirroring', () => {
    expect(parseFlagSpec('de|fc0>2e7d32|mirror')).toEqual({ code: 'de', swaps: [{ from: 'fc0', to: '2e7d32' }], mirror: true })
    expect(FLAG_SPEC.test('gb-eng')).toBe(true)
    expect(FLAG_SPEC.test('Deutschland')).toBe(false)
  })

  it('swaps colours and keeps ids unique per copy', () => {
    const svg = '<svg><defs><clipPath id="a"/></defs><g clip-path="url(#a)"><path fill="#FC0"/><path fill="red"/></g></svg>'
    const painted = paintFlag(svg, parseFlagSpec('de|fc0>00ff00|red>0000ff'), 'x1')
    expect(painted).toContain('fill="#00ff00"')
    expect(painted).toContain('fill="#0000ff"')
    expect(painted).toContain('id="x1-a"')
    expect(painted).toContain('url(#x1-a)')
  })
})
