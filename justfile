# DeepSeek Exporter — reusable development commands
set shell := ["bash", "-c"]
export COREPACK_ENABLE_DOWNLOAD_PROMPT := "0"

# List available recipes
default:
    @just --list

# Install dependencies (pnpm version pinned by packageManager)
install:
    corepack pnpm install

# Start the Vite dev server
dev:
    corepack pnpm dev

# Build dist/deepseek.user.js
build:
    corepack pnpm build

# Typecheck only
typecheck:
    corepack pnpm test:types

# Typecheck + unit tests
test:
    corepack pnpm test

# Run a single vitest file, e.g. just test-file tests/export-safety.test.ts
test-file file:
    corepack pnpm vitest run {{file}}

# ESLint
lint:
    corepack pnpm lint

# ESLint with autofix
lint-fix:
    corepack pnpm lint:fix

# Full quality gate
check: test lint build

# CI-equivalent pipeline (unit + e2e)
ci: check e2e

# Install the Playwright browser used by E2E tests
e2e-install:
    corepack pnpm exec playwright install chromium

# Run BDD E2E tests (headless), building first
e2e: build
    corepack pnpm test:e2e

# Run BDD E2E tests headed (debugging)
e2e-headed: build
    corepack pnpm test:e2e:headed

# Serve the built userscript for manual / Tampermonkey installation
serve-dist port="8766":
    python3 -m http.server {{port}} --bind 127.0.0.1 --directory dist
