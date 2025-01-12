export interface CalculationResults {
  cols1: number
  rows1: number
  total1: number
  adjustedTotal1: number // Added this for comparison
  remainder1: number

  cols2: number
  rows2: number
  total2: number
  adjustedTotal2: number
  remainder2: number

  totalRectangles: number
}

export function calculateLayout(
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
): CalculationResults {
  // Layout option 1 - Lengthwise
  const cols1 = Math.floor(formatLength / rectLength)
  const rows1 = Math.floor(formatWidth / rectWidth)
  const total1 = cols1 * rows1
  const remainder1 = formatLength - rectLength * cols1

  // Adjust total1 for remainder1 (extra row)
  let adjustedTotal1 = total1
  if (remainder1 >= rectWidth) {
    adjustedTotal1 = cols1 * rows1 + Math.floor(formatWidth / rectLength)
  }

  // Layout option 2 - Crosswise
  const cols2 = Math.floor(formatLength / rectWidth)
  const rows2 = Math.floor(formatWidth / rectLength)
  const total2 = cols2 * rows2
  const remainder2 = formatWidth - rectLength * rows2

  // Adjust total1 for remainder1 (extra row)
  let adjustedTotal2 = total2
  if (remainder2 >= rectWidth) {
    adjustedTotal2 = cols2 * rows2 + Math.floor(formatLength / rectLength)
  }

  // Determine the best layout
  // const totalRectangles = adjustedTotal1 > total2 ? adjustedTotal1 : total2
  const totalRectangles =
    adjustedTotal1 > adjustedTotal2 ? adjustedTotal1 : adjustedTotal2

  return {
    cols1,
    rows1,
    total1, // Option 1 without adjustment
    adjustedTotal1, // Option 1 with adjustment
    remainder1,
    cols2,
    rows2,
    total2, // Option 2 as is
    adjustedTotal2, // Option 2 with adjustment
    remainder2,
    totalRectangles,
  }
}
