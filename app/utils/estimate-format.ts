/**
 * Years (unitless values in a plausible year range) keep their digits together: 1991, not 1 991.
 * Thousands are grouped with a narrow no-break space, because a dot ("42.195 m") reads as a decimal point.
 */
export function formatEstimate(value: number, unit: string) {
  const isYear = !unit && Number.isInteger(value) && value >= 1000 && value <= 2100
  return value.toLocaleString('de-DE', { useGrouping: !isYear }).replace(/\./g, ' ')
}
