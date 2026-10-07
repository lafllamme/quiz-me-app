/** Years (unitless values in a plausible year range) keep their digits together: 1991, not 1.991. */
export function formatEstimate(value: number, unit: string) {
  const isYear = !unit && Number.isInteger(value) && value >= 1000 && value <= 2100
  return value.toLocaleString('de-DE', { useGrouping: !isYear })
}
