export function standardizeLineBreaks(text: string): string {
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
}

const PLACEHOLDER_PATTERN = /\{([a-z_]+)\}/g
const TEMPLATE_PATTERN = /\{\{([a-z_]+)\}\}/g

/**
 * Replace `{name}` placeholders in a single pass. Unknown placeholders are
 * kept as-is, and values are inserted verbatim: `$&`-style patterns and text
 * that merely looks like another placeholder (`{date}` inside a title) are
 * never re-interpreted. Set `doubleBraces` for `{{name}}` templates.
 */
export function fillTemplate(
    template: string,
    values: Record<string, string>,
    { doubleBraces = false } = {},
): string {
    return template.replace(doubleBraces ? TEMPLATE_PATTERN : PLACEHOLDER_PATTERN, (match, name: string) => values[name] ?? match)
}
