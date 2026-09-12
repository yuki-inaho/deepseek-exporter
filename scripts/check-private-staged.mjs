#!/usr/bin/env node
/**
 * Pre-commit guard: refuse to commit staged files that look like private or
 * secret material (agent profiles, browser cookie databases, OAuth tokens,
 * keys). Run after lint-staged. Bypassing with `git commit --no-verify` is
 * possible but must stay an explicit, auditable decision.
 */
import { execFileSync } from 'node:child_process'
import process from 'node:process'
import { findPrivatePath, findSecretContent } from './lib/private-guard.mjs'

function stagedFiles() {
    const out = execFileSync(
        'git',
        ['diff', '--cached', '--name-only', '-z', '--diff-filter=ACMR'],
        { encoding: 'utf8' },
    )
    return out.split('\0').filter(Boolean)
}

function stagedContent(file) {
    try {
        return execFileSync('git', ['show', `:${file}`], {
            encoding: 'utf8',
            maxBuffer: 32 * 1024 * 1024,
        })
    }
    catch {
        return ''
    }
}

const violations = []

// The guard's own matcher and tests intentionally contain secret-like literals;
// path checks still apply to them.
const GUARD_SELF_FILES = new Set([
    'scripts/check-private-staged.mjs',
    'scripts/lib/private-guard.mjs',
    'scripts/lib/private-guard.d.mts',
    'tests/private-guard.test.ts',
])

for (const file of stagedFiles()) {
    const pathHit = findPrivatePath(file)
    if (pathHit) {
        violations.push(`${file} — path looks private: ${pathHit}`)
        continue
    }

    if (GUARD_SELF_FILES.has(file)) continue

    const value = stagedContent(file)
    if (!value) continue
    const contentHit = findSecretContent(value)
    if (contentHit) violations.push(`${file} — content looks secret: ${contentHit}`)
}

if (violations.length > 0) {
    console.error('\n[private-staging-guard] Blocked: private information is staged.')
    for (const violation of violations) console.error(`  - ${violation}`)
    console.error('\nUnstage or remove these files, or commit with --no-verify if this is a deliberate exception.\n')
    process.exit(1)
}
