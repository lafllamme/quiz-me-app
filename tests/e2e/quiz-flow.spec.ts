import { expect, test } from '@playwright/test'

test.describe('Jungle Quiz flow', () => {
  test('starts with six categories and persists a resolved question', async ({ page }) => {
    await page.setViewportSize({ width: 2048, height: 1177 })
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('jungle-e2e-clean')) {
        window.localStorage.clear()
        window.sessionStorage.setItem('jungle-e2e-clean', '1')
      }
    })
    await page.goto('/')
    await page.waitForTimeout(750)

    const pool = page.getByText(/\d+ \/ \d+ im Pool/)
    await expect(pool).toBeVisible()
    const total = Number((await pool.textContent())!.match(/(\d+) im Pool/)![1])
    await expect(page.getByText(`${total} / ${total} im Pool`)).toBeVisible()
    const startButton = page.locator('.game-setup-action')
    await expect(startButton).toBeVisible()
    await startButton.click()
    await expect(page.getByRole('heading', { name: 'Wer fängt an?' })).toBeVisible({ timeout: 3_000 })
    await page.getByRole('button', { name: /Weiter zu den Kategorien/i }).click()

    const categoryOptions = page.locator('.category-board-option')
    await expect(categoryOptions).toHaveCount(6)
    await expect(page.locator('.category-board')).toHaveCSS('background-color', 'rgb(8, 24, 17)')
    await expect(categoryOptions.first()).toHaveCSS('background-color', 'rgb(11, 68, 41)')
    await expect(categoryOptions.first()).toHaveCSS('border-top-left-radius', '16px')
    const gridColumns = await page.locator('.category-board-grid').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
    expect(gridColumns).toBe(3)
    const logoBox = await page.locator('.app-header .brand-logo').boundingBox()
    const markerLabelBox = await page.locator('.category-board-marker-top').boundingBox()
    expect(logoBox).not.toBeNull()
    expect(markerLabelBox).not.toBeNull()
    expect(markerLabelBox!.y).toBeGreaterThan(logoBox!.y + logoBox!.height)
    await categoryOptions.first().hover()
    await expect(categoryOptions.first()).toHaveCSS('background-color', 'rgb(202, 255, 74)')
    await categoryOptions.first().click()

    await expect(page.locator('.question-live-stage')).toBeVisible()
    await page.getByRole('button', { name: /Antwort zeigen/i }).click()
    await expect(page.locator('.question-live-stage').getByRole('button', { name: 'Weiter' })).toBeVisible()

    await page.getByRole('button', { name: 'Zum Menü' }).click()
    await expect(page.getByText(`${total - 1} / ${total} im Pool`)).toBeVisible()

    await page.reload()
    await expect(page.getByText(`${total - 1} / ${total} im Pool`)).toBeVisible()
  })
})
