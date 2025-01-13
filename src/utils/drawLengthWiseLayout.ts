import Drawing from 'dxf-writer'

export const drawLengthwiseLayout = (
  dxf: Drawing,
  rectLength: number,
  rectWidth: number,
  // formatLength: number,
  formatWidth: number,
  cols1: number,
  rows1: number,
  remainder1: number
): void => {
  const numLines = Math.floor(formatWidth / rectLength)
  const sharedLine =
    rectLength * numLines > rows1 * rectWidth
      ? rectLength * numLines
      : rows1 * rectWidth

  // Draw horizontal lines for both
  for (let i = 0; i <= rows1; i++) {
    const y = rectWidth * i
    dxf.drawLine(0, y, cols1 * rectLength, y)
  }

  // Draw vertical lines for both
  for (let j = 0; j < cols1; j++) {
    const x = rectLength * j
    dxf.drawLine(x, 0, x, rows1 * rectWidth)
  }

  if (remainder1 < rectWidth) {
    // Final Vertical Line
    dxf.drawLine(rectLength * cols1, 0, rectLength * cols1, rows1 * rectWidth)
  } else {
    // Additional Horizontal Lines
    for (let i = 0; i <= numLines; i++) {
      const y = rectLength * i
      dxf.drawLine(cols1 * rectLength, y, cols1 * rectLength + rectWidth, y)
    }
    // Shared Vertical Line
    dxf.drawLine(rectLength * cols1, 0, rectLength * cols1, sharedLine)
    // Additional Vertical Line
    dxf.drawLine(
      cols1 * rectLength + rectWidth,
      0,
      cols1 * rectLength + rectWidth,
      numLines * rectLength
    )
  }
}
