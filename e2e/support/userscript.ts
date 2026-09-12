import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Page } from '@playwright/test'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/**
 * Minimal GM_* API stub backed by localStorage so the built userscript runs
 * outside a userscript manager. Mirrors what Tampermonkey provides.
 */
const GM_STUB = `(() => {
  const ns = 'deepseek-exporter:gm:'
  const store = new Map()
  try {
    // The exporter refuses to call the API without a DeepSeek login token;
    // seed a fake one so E2E can mock the API instead of signing in.
    localStorage.setItem('userToken', JSON.stringify({ value: 'e2e-token' }))
  }
  catch { /* ignore */ }
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(ns)) {
        try { store.set(key.slice(ns.length), JSON.parse(localStorage.getItem(key))) }
        catch { /* ignore */ }
      }
    }
  }
  catch { /* ignore */ }
  window.GM_getValue = (key, defaultValue) => store.has(key) ? store.get(key) : defaultValue
  window.GM_setValue = (key, value) => {
    store.set(key, value)
    try { localStorage.setItem(ns + key, JSON.stringify(value)) }
    catch { /* ignore */ }
  }
  window.GM_deleteValue = (key) => {
    store.delete(key)
    try { localStorage.removeItem(ns + key) }
    catch { /* ignore */ }
  }
})()`

function readDist(relativePath: string): string {
    const file = path.join(ROOT, relativePath)
    if (!existsSync(file)) {
        throw new Error(`${relativePath} is missing — run \`pnpm build\` before the E2E suite`)
    }
    return readFileSync(file, 'utf8')
}

/**
 * The built userscript externalizes jszip/html2canvas to @require globals.
 * Concatenate the pinned libraries before the bundle so the injected script
 * sees the same globals a userscript manager would provide.
 */
export function buildUserscriptBundle(): string {
    return [
        GM_STUB,
        readDist('node_modules/jszip/dist/jszip.min.js'),
        readDist('node_modules/html2canvas/dist/html2canvas.min.js'),
        readDist('dist/deepseek.user.js'),
    ].join('\n')
}

export async function installUserscript(page: Page): Promise<void> {
    await page.addInitScript({ content: buildUserscriptBundle() })
}
