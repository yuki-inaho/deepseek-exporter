import { readFileSync } from 'node:fs'
import { createBdd } from 'playwright-bdd'
import { expect, test } from '../support/fixtures'

const { Given, When, Then } = createBdd(test)

Given('a DeepSeek conversation containing unsafe URLs', async ({ page, exporter }) => {
    await page.goto(exporter.chatUrl)
    await expect(page.locator('#deepseek-exporter-root')).toHaveCount(1)
    await expect(page.locator('#deepseek-exporter-portal')).toHaveCount(1)
})

When('I export the conversation as {string}', async ({ page, lastDownload }, format: string) => {
    await page.getByRole('button', { name: 'Export', exact: true }).click()
    await page.getByRole('button', { name: format, exact: true }).waitFor()

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: format, exact: true }).click(),
    ])

    lastDownload.name = download.suggestedFilename()
    lastDownload.path = (await download.path()) ?? ''
    expect(lastDownload.path).not.toBe('')
})

Then('the Markdown export has no executable URLs', ({ lastDownload }) => {
    const content = readFileSync(lastDownload.path, 'utf8')
    expect(content).not.toContain('javascript:')
    expect(content).not.toContain('data:text/html')
})

Then('the Markdown export keeps safe URLs', ({ lastDownload }) => {
    const content = readFileSync(lastDownload.path, 'utf8')
    expect(content).toContain('https://example.com/safe')
    expect(content).toContain('Evil')
})

Then('the HTML export keeps {int} Subresource Integrity attributes', ({ lastDownload }, count: number) => {
    const content = readFileSync(lastDownload.path, 'utf8')
    const matches = content.match(/integrity="sha512-/g) ?? []
    expect(matches).toHaveLength(count)
})

Then('the HTML export has no executable links', ({ lastDownload }) => {
    const content = readFileSync(lastDownload.path, 'utf8')
    expect(content).not.toContain('href="javascript:')
})

Then('the export menu is closed', async ({ page }) => {
    const state = await page.evaluate(() => {
        const host = document.querySelector('#deepseek-exporter-portal')
        const shadow = host?.shadowRoot
        return {
            menu: Boolean(shadow?.querySelector('[role=menu]')),
            backdrop: Boolean(shadow?.querySelector('.ce-clickout-backdrop')),
        }
    })
    expect(state).toEqual({ menu: false, backdrop: false })
})
