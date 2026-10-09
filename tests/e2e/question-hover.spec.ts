import { expect, type Page, test } from '@playwright/test'

const ACCENT = 'rgb(202, 255, 74)'

interface Box { x: number, y: number, width: number, height: number }

async function settle(page: Page) {
  await page.waitForTimeout(900)
}

// Questions are random; estimate questions have no A–D tiles, so skip past them.
async function skipQuestion(page: Page) {
  await page.keyboard.press('z')
  await page.keyboard.press('f')
  await page.keyboard.press('Enter')
  await expect(page.locator('.category-board-option').first()).toBeVisible()
  await settle(page)
}

test.describe('Question answers @safari', () => {
  test('a fresh question does not light the option under a resting cursor', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('jungle-e2e-clean')) {
        window.localStorage.clear()
        window.sessionStorage.setItem('jungle-e2e-clean', '1')
      }
    })
    await page.goto('/')
    // WebKit hydrates the dev build slowly; an early click would submit the form natively.
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)

    await page.locator('.game-setup-action').click()
    await page.getByRole('button', { name: /Weiter zu den Kategorien/i }).click()
    await settle(page)

    const options = page.locator('.question-live-option')
    const stage = page.locator('.question-live-stage')
    let optionBoxes: Box[] = []
    for (let attempt = 0; attempt < 6 && !optionBoxes.length; attempt++) {
      await page.locator('.category-board-option:not(:disabled)').first().click()
      await expect(stage).toBeVisible()
      await settle(page)
      if (await options.count())
        optionBoxes = await options.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().toJSON()))
      else
        await skipQuestion(page)
    }
    expect(optionBoxes.length, 'reached a multiple-choice question').toBeGreaterThan(0)

    // Real movement arms hover as usual.
    const first = optionBoxes[0]!
    await page.mouse.move(first.x + first.width / 2 - 20, first.y + first.height / 2, { steps: 4 })
    await page.mouse.move(first.x + first.width / 2, first.y + first.height / 2, { steps: 4 })
    await expect(options.first()).toHaveCSS('background-color', ACCENT)

    // Rest the cursor on a category tile that sits where an answer will appear, then open it.
    for (let attempt = 0; attempt < 6; attempt++) {
      await skipQuestion(page)
      const tiles = await page.locator('.category-board-option:not(:disabled)').evaluateAll(nodes => nodes.map((node) => {
        const r = node.getBoundingClientRect()
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
      }))
      const spot = tiles.find(tile => optionBoxes.some(box => tile.x > box.x && tile.x < box.x + box.width && tile.y > box.y && tile.y < box.y + box.height))
      expect(spot, 'a category tile overlaps an answer slot').toBeTruthy()
      await page.mouse.move(spot!.x, spot!.y, { steps: 4 })
      await page.mouse.down()
      await page.mouse.up()
      await expect(stage).toBeVisible()
      await settle(page)

      const underCursor = page.locator('.question-live-option:hover')
      if (!await underCursor.count())
        continue
      await expect(underCursor).not.toHaveCSS('background-color', ACCENT)

      // The first real nudge brings the hover back.
      await page.mouse.move(spot!.x + 6, spot!.y, { steps: 3 })
      await expect(underCursor).toHaveCSS('background-color', ACCENT)
      return
    }
    throw new Error('never landed a resting cursor on a fresh answer tile')
  })
})
