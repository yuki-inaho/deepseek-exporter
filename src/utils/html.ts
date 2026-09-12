export function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#039;')
}

export function escapeCssString(value: string): string {
    return value
        .replaceAll('\\', '\\\\')
        .replaceAll('"', '\\"')
        .replaceAll('<', '\\3c ')
        .replaceAll('>', '\\3e ')
        .replaceAll('\n', '\\a ')
        .replaceAll('\r', '')
        .replaceAll('\f', '\\c ')
}

/** Only allow URL forms that are meaningful and safe in a standalone image element. */
export function safeImageUrl(value: unknown): string {
    if (typeof value !== 'string') return ''
    const url = value.trim()
    if (/^data:image\/(?:avif|bmp|gif|jpe?g|png|svg\+xml|webp)(?:;[^,]*)?,/i.test(url)) {
        return url
    }

    try {
        const parsed = new URL(url)
        return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : ''
    }
    catch {
        return ''
    }
}

/**
 * Markdown link allowlist, aligned with the href protocols accepted by the
 * HTML exporter's hast-util-sanitize schema: http(s), mailto, irc(s), xmpp and
 * relative/anchor URLs. Dangerous schemes (javascript:, vbscript:, file:,
 * data:) return ''.
 */
export function safeLinkUrl(value: unknown): string {
    if (typeof value !== 'string') return ''
    const url = value.trim()
    if (!url) return ''
    if (url.startsWith('#') || url.startsWith('/')) return url

    try {
        const parsed = new URL(url)
        const allowed = ['http:', 'https:', 'mailto:', 'irc:', 'ircs:', 'xmpp:']
        return allowed.includes(parsed.protocol) ? url : ''
    }
    catch {
        // Relative path or query; no scheme to execute.
        return url
    }
}
