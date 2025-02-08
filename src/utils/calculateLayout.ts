import { ISingleLayout, IBothResults } from '../types'

function calculateLengthwiseLayout(
  formatLength: number,
  formatWidth: number,
  rectLength: number,
  rectWidth: number
): ISingleLayout {
  const cols = Math.floor(formatLength / rectLength)
  const rows = Math.floor(formatWidth / rectWidth)
  const total = cols * rows

  const remainderLength = formatLength - rectLength * cols
  const remainderWidth =
    formatWidth - rectLength * Math.floor(formatWidth / rectLength)

  // Adjust total1 for remainder1 (extra row)
  let adjustedTotal = total
  if (remainderLength >= rectWidth) {
    // const additionalCols = Math.floor(formatWidth / rectLength)
    // adjustedTotal += additionalCols * rows
    adjustedTotal = cols * rows + Math.floor(formatWidth / rectLength)
  }

  return { cols, rows, total, adjustedTotal, remainderLength, remainderWidth }
}

function calculateCrosswiseLayout(
  formatLength: number,
  formatWidth: number,
  rectLength: number,
  rectWidth: number
): ISingleLayout {
  const cols = Math.floor(formatLength / rectWidth)
  const rows = Math.floor(formatWidth / rectLength)
  const total = cols * rows
  const remainderLength = formatLength - rectLength * cols
  const remainderWidth = formatWidth - rectLength * rows

  // Adjust total for possible additional rectangles (extra row)
  let adjustedTotal = total
  if (remainderWidth >= rectWidth) {
    // const additionalCols = Math.floor(remainderWidth / rectWidth)
    // adjustedTotal += additionalCols * rows
    adjustedTotal = cols * rows + Math.floor(formatLength / rectLength)
  }

  return { cols, rows, total, adjustedTotal, remainderLength, remainderWidth }
}

export function calculateLayout(
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
): IBothResults {
  // Layout (lengthwise)
  const lengthwise = calculateLengthwiseLayout(
    formatLength,
    formatWidth,
    rectLength,
    rectWidth
  )

  // Layout (crosswise)
  const crosswise = calculateCrosswiseLayout(
    formatLength,
    formatWidth,
    rectLength,
    rectWidth
  )

  // const bestTotalRectangles = Math.max(
  //   lengthwise.adjustedTotal,
  //   crosswise.adjustedTotal
  // )

  const results = { lengthwise, crosswise }
  // console.log('Calculated results:', results) // DEBUG
  return results
}
