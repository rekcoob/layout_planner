import Drawing from 'dxf-writer'

export const drawLengthwiseLayout = (
  dxf: Drawing,
  rectLength: number,
  rectWidth: number,
  // formatLength: number,
  formatWidth: number,
  cols1: number,
  rows1: number
): void => {
  const numLines = Math.floor(formatWidth / rectLength)

  // Draw horizontal lines
  for (let i = 0; i <= rows1; i++) {
    const y = rectWidth * i
    dxf.drawLine(0, y, cols1 * rectLength, y)
  }

  // Draw additional horizontal lines
  for (let i = 0; i <= numLines; i++) {
    const y = rectLength * i
    dxf.drawLine(cols1 * rectLength, y, cols1 * rectLength + rectWidth, y)
  }

  // Draw vertical lines
  for (let j = 0; j <= cols1; j++) {
    const x = rectLength * j
    dxf.drawLine(x, 0, x, rows1 * rectWidth)
  }

  // Final vertical line for additional area
  dxf.drawLine(
    cols1 * rectLength + rectWidth,
    0,
    cols1 * rectLength + rectWidth,
    numLines * rectLength
  )
}
