import { readFileSync } from 'node:fs'
import { expect } from '@playwright/test'
import { test as base } from 'playwright-bdd'
import { installUserscript } from './userscript'

export const CHAT_URL = 'https://chat.deepseek.com/a/chat/s/e2e-fixture'

const CHAT_HTML = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>DeepSeek</title></head>
<body>
    <main id="app"><div id="thread"></div></main>
</body>
</html>`

export interface DownloadRecord {
    name: string
    path: string
}

interface ExporterFixtures {
    /** A fake DeepSeek page with the userscript injected and APIs mocked. */
    exporter: { chatUrl: string }
    /** Mutable slot filled by export steps and read by assertion steps. */
    lastDownload: DownloadRecord
}

export const test = base.extend<ExporterFixtures>({
    exporter: async ({ context, page }, use) => {
        const fixture = readFileSync(new URL('../fixtures/history-messages.json', import.meta.url), 'utf8')

        await context.route('https://chat.deepseek.com/**', async (route) => {
            const request = route.request()
            if (request.url().includes('/api/v0/chat/history_messages')) {
                await route.fulfill({ status: 200, contentType: 'application/json', body: fixture })
                return
            }
            if (request.resourceType() === 'document') {
                await route.fulfill({ status: 200, contentType: 'text/html', body: CHAT_HTML })
                return
            }
            await route.fulfill({ status: 204, body: '' })
        })

        await installUserscript(page)
        await use({ chatUrl: CHAT_URL })
    },

    lastDownload: async (_, use) => {
        await use({ name: '', path: '' })
    },
})

export { expect }
