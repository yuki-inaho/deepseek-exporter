import { describe, expect, it } from 'vitest'
import { findPrivatePath, findSecretContent } from '../scripts/lib/private-guard.mjs'

describe('private staging guard', () => {
    it('flags private paths', () => {
        expect(findPrivatePath('temp/workdoc_Apr16-2026_x.md')).toContain('temp/')
        expect(findPrivatePath('temp/ds-tm3-profile/Default/Cookies')).toContain('temp/')
        expect(findPrivatePath('.playwright-cli/page-1.yml')).toContain('.playwright-cli/')
        expect(findPrivatePath('e2e/.auth/state.json')).toContain('auth')
        expect(findPrivatePath('test-results/run/trace.zip')).toContain('test-results/')
        expect(findPrivatePath('storageState.json')).toContain('storage state')
        expect(findPrivatePath('.env.local')).toContain('.env')
        expect(findPrivatePath('Default/Login Data')).toContain('Login Data')
    })

    it('keeps ordinary repository paths allowed', () => {
        expect(findPrivatePath('src/utils/markdown.ts')).toBeNull()
        expect(findPrivatePath('e2e/fixtures/history-messages.json')).toBeNull()
        expect(findPrivatePath('tests/export-safety.test.ts')).toBeNull()
        expect(findPrivatePath('dist/deepseek.user.js')).toBeNull()
        expect(findPrivatePath('README.md')).toBeNull()
    })

    it('flags secret-looking content', () => {
        expect(findSecretContent('"userToken": "abc123"')).toContain('userToken')
        expect(findSecretContent('Cookie: aws-waf-token=abc')).toContain('AWS WAF token')
        expect(findSecretContent('-----BEGIN RSA PRIVATE KEY-----')).toContain('private key')
        expect(findSecretContent('Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.sig')).toContain('bearer JWT')
        expect(findSecretContent('{"refresh_token": "1//0abcdefghijklmnop"}')).toContain('refresh token')
    })

    it('keeps ordinary source and docs content allowed', () => {
        expect(findSecretContent('const token = auth.token')).toBeNull()
        expect(findSecretContent('// mention of userToken in prose')).toBeNull()
        expect(findSecretContent('export function findSecretContent() {}')).toBeNull()
    })
})
