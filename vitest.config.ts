import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// Keep unit tests isolated from the Playwright/BDD generated tests.
export default mergeConfig(viteConfig, defineConfig({
    test: {
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'e2e/**',
            '.features-gen/**',
        ],
    },
}))
