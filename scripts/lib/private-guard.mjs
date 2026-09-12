/**
 * Pure matchers used by the pre-commit guard that blocks private data from
 * being staged. Keep the patterns specific so ordinary source files do not
 * trip them.
 */

const PRIVATE_PATH_PATTERNS = [
    { pattern: /(^|\/)temp\//i, label: 'temp/ (workdocs, OAuth profiles, fixtures)' },
    { pattern: /(^|\/)\.playwright-cli\//i, label: '.playwright-cli/ tool artifacts' },
    { pattern: /(^|\/)\.auth\//i, label: 'stored auth state' },
    { pattern: /(^|\/)test-results\//i, label: 'playwright test-results/' },
    { pattern: /(^|\/)playwright-report\//i, label: 'playwright report' },
    { pattern: /(^|\/)blob-report\//i, label: 'playwright blob-report/' },
    { pattern: /(^|\/)\.env(\.|$)/i, label: '.env file' },
    { pattern: /(^|\/)cookies(\.sqlite)?$/i, label: 'browser Cookies database' },
    { pattern: /storageState.*\.json$/i, label: 'storage state file' },
    { pattern: /\.profile($|\/)/i, label: 'browser profile directory' },
    { pattern: /(^|\/)Login Data$/i, label: 'browser Login Data database' },
]

const SECRET_CONTENT_PATTERNS = [
    { pattern: /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/, label: 'private key material' },
    { pattern: /aws-waf-token/i, label: 'AWS WAF token' },
    { pattern: /"userToken"\s*:/i, label: 'DeepSeek userToken' },
    { pattern: /Bearer\s+eyJ[A-Za-z0-9._-]{20,}/, label: 'bearer JWT' },
    { pattern: /ya29\.[A-Za-z0-9._-]{10,}/, label: 'Google OAuth token' },
    { pattern: /(?:client_secret|refresh_token)"?\s*[:=]\s*"[^"]{10,}"/i, label: 'OAuth client secret / refresh token' },
]

/**
 * @param {string} filePath staged path (repo-relative, forward slashes)
 * @returns {string | null} matched label or null
 */
export function findPrivatePath(filePath) {
    for (const { pattern, label } of PRIVATE_PATH_PATTERNS) {
        if (pattern.test(filePath)) return label
    }
    return null
}

/**
 * @param {string} text staged file content
 * @returns {string | null} matched label or null
 */
export function findSecretContent(text) {
    for (const { pattern, label } of SECRET_CONTENT_PATTERNS) {
        if (pattern.test(text)) return label
    }
    return null
}
