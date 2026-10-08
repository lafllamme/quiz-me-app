import { expect, test } from '@playwright/test'

test.describe('Sound Sniper flow', () => {
  test('buzz, judge and reveal without showing the answer early', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('jungle-e2e-clean')) {
        window.localStorage.clear()
        window.sessionStorage.setItem('jungle-e2e-clean', '1')
      }
    })
    await page.goto('/')
    await page.waitForTimeout(750)

    await page.getByRole('radio', { name: 'Sound Sniper' }).click()
    await expect(page.getByRole('heading', { name: /hört's/ })).toBeVisible()
    await expect(page.getByText(/Sounds im Pool/)).toBeVisible()
    await page.locator('.game-setup-action').click()

    const stage = page.locator('.sniper-stage')
    await expect(stage).toHaveClass(/sniper-stage--ready/)
    await expect(page.locator('.sniper-reveal-answer')).toHaveCount(0)

    // Buzzes before the round opens are ignored.
    await page.keyboard.press('1')
    await page.keyboard.press('Enter')
    await expect(stage).toHaveClass(/sniper-stage--countdown/)
    await page.keyboard.press('1')
    await expect(stage).toHaveClass(/sniper-stage--listening/, { timeout: 4_000 })
    await expect(page.locator('.sniper-reveal-answer')).toHaveCount(0)

    // First buzz wins; the second team key is locked out.
    await page.keyboard.press('2')
    await page.keyboard.press('1')
    await expect(stage).toHaveClass(/sniper-stage--buzzed/)
    await expect(page.locator('.sniper-buzz strong')).toHaveText('TEAM TWO')
    await expect(page.locator('.sniper-buzz-answer')).toHaveCount(0)

    // The same team key again uncovers the solution before the host judges.
    await page.keyboard.press('2')
    await expect(page.locator('.sniper-buzz-answer')).toBeVisible()

    // Wrong: the point goes straight to the other team, the buzzing team drinks.
    await page.keyboard.press('f')
    await expect(stage).toHaveClass(/sniper-stage--resolved/)
    await expect(page.locator('.sniper-reveal-answer')).toBeVisible()
    await expect(page.locator('.question-live-team--one .question-live-team-score')).toHaveText('1')
    await expect(page.locator('.sniper-reveal-drink')).toHaveText(/TEAM TWO trinkt/i)

    await page.keyboard.press('Enter')
    await expect(stage).toHaveClass(/sniper-stage--ready/)
    await expect(page.getByText(/Sound 2 \/ 10/)).toBeVisible()
  })
})
