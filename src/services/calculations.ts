// calculations.ts
export interface CalculationResults {
  cols1: number
  rows1: number
  total1: number
  remainder: number
  totalRectangles: number
}

export function calculateLayout(
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
): CalculationResults {
  const cols1 = Math.floor(formatLength / rectLength)
  const rows1 = Math.floor(formatWidth / rectWidth)
  const total1 = cols1 * rows1

  const remainder = formatLength - rectLength * cols1

  let totalRectangles = 0
  if (remainder < rectWidth) {
    totalRectangles = cols1 * rows1
  } else {
    totalRectangles = cols1 * rows1 + Math.floor(formatWidth / rectLength)
  }

  return { cols1, rows1, total1, remainder, totalRectangles }
}
