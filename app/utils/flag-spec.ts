/**
 * Flag specs are compact strings so flags can double as answer options:
 * `de` · `de|fc0>2e7d32` (swap a fill colour as written in the SVG) · `de|mirror`.
 */
export interface FlagSpec {
  code: string
  swaps: readonly { from: string, to: string }[]
  mirror: boolean
}

export const FLAG_SPEC = /^[a-z]{2}(?:-[a-z]+)?(?:\|(?:mirror|#?[0-9a-z]+>#?[0-9a-f]{3,6}))*$/i

export function parseFlagSpec(spec: string): FlagSpec {
  const [code = '', ...parts] = spec.split('|')
  const swaps = parts.filter(part => part.includes('>')).map((part) => {
    const [from = '', to = ''] = part.split('>')
    return { from: from.replace('#', ''), to: to.replace('#', '') }
  })
  return { code: code.toLowerCase(), swaps, mirror: parts.includes('mirror') }
}

/** Applies colour swaps and makes ids unique so several copies of one flag can share a page. */
export function paintFlag(svg: string, spec: FlagSpec, idPrefix: string) {
  let result = svg
  for (const { from, to } of spec.swaps) {
    const value = /^[0-9a-f]{3,6}$/i.test(from) ? `#${from}` : from
    const pattern = new RegExp(`(fill|stroke)="${value.replace('#', '#?')}"`, 'gi')
    result = result.replace(pattern, `$1="#${to}"`)
  }
  return result
    .replace(/\sid="([^"]+)"/g, ` id="${idPrefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${idPrefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${idPrefix}-$1"`)
}
