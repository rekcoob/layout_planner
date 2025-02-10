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
  const remainder = formatLength - rectLength * cols

  // Adjust total for possible additional rectangles in other direction
  let adjustedTotal = total
  if (remainder >= rectWidth) {
    // const additionalCols = Math.floor(formatWidth / rectLength)
    // adjustedTotal += additionalCols * rows
    adjustedTotal = cols * rows + Math.floor(formatWidth / rectLength)
  }
  return { cols, rows, total, adjustedTotal, remainder }
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
  const remainder = formatWidth - rectLength * rows

  // Adjust total for possible additional rectangles in other direction
  let adjustedTotal = total
  if (remainder >= rectWidth) {
    adjustedTotal = cols * rows + Math.floor(formatLength / rectLength)
  }
  return { cols, rows, total, adjustedTotal, remainder }
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
  // console.log('calculate  layout...')
  const results = { lengthwise, crosswise }
  return results
}
