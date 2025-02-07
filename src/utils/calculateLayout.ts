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

function calculateSingleLayout(
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

  // Adjust total for possible additional rectangles
  let adjustedTotal = total

  // Pre zvyšný priestor na dĺžku skontrolujeme, či sa zmestia dodatočné obdĺžniky otočené na šírku
  if (remainderLength >= rectWidth) {
    const additionalCols = Math.floor(remainderLength / rectWidth)
    adjustedTotal += additionalCols * rows
  }

  // Pre zvyšný priestor na šírku skontrolujeme, či sa zmestia dodatočné obdĺžniky otočené na dĺžku
  if (remainderWidth >= rectWidth) {
    // napicu vzorec porovnaj s

    // let adjustedTotal2 = total2
    // if (remainder2 >= rectWidth) {
    //   adjustedTotal2 = cols2 * rows2 + Math.floor(formatLength / rectLength)
    // }
    const additionalRows = Math.floor(remainderWidth / rectLength)
    adjustedTotal += additionalRows * Math.floor(formatLength / rectWidth)

    // adjustedTotal =
    //   Math.floor(formatLength / rectWidth) *
    //     Math.floor(formatWidth / rectLength) +
    //   Math.floor(formatLength / rectLength)
  }

  return { cols, rows, total, adjustedTotal, remainderLength, remainderWidth }
}

export function calculateLayout(
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
): IBothResults {
  // Layout with rectLength and rectWidth (lengthwise)
  const lengthwise = calculateLengthwiseLayout(
    formatLength,
    formatWidth,
    rectLength,
    rectWidth
  )

  // Layout with rectWidth and rectLength (crosswise)
  const crosswise = calculateSingleLayout(
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
