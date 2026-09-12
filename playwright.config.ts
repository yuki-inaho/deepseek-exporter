import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
    features: 'e2e/features/**/*.feature',
    steps: ['e2e/steps/**/*.ts', 'e2e/support/fixtures.ts'],
})

export default defineConfig({
    testDir,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [['github'], ['list']] : [['list']],
    use: {
        locale: 'en-US',
        trace: 'retain-on-failure',
    },
})
