import { expect, test } from '@playwright/test'

test.describe('Jungle Quiz flow', () => {
  test('starts with six categories and persists a resolved question', async ({ page }) => {
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('jungle-e2e-clean')) {
        window.localStorage.clear()
        window.sessionStorage.setItem('jungle-e2e-clean', '1')
      }
    })
    await page.goto('/')
    await page.waitForTimeout(750)

    await expect(page.getByText('90 / 90 im Pool')).toBeVisible()
    const startButton = page.locator('.game-setup-action')
    await expect(startButton).toBeVisible()
    await startButton.click()
    await expect(page.getByText('Die Münze')).toBeVisible({ timeout: 3_000 })

    const categoryOptions = page.locator('.category-board-option')
    await expect(categoryOptions).toHaveCount(6)
    await categoryOptions.first().click()

    await expect(page.locator('.question-live-stage')).toBeVisible()
    await page.getByRole('button', { name: /Antwort zeigen/i }).click()
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible()

    await page.getByRole('button', { name: 'Zum Menü' }).click()
    await expect(page.getByText('89 / 90 im Pool')).toBeVisible()

    await page.reload()
    await expect(page.getByText('89 / 90 im Pool')).toBeVisible()
  })
})
