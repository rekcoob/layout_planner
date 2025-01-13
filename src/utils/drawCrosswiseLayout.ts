import Drawing from 'dxf-writer'

export const drawCrosswiseLayout = (
  dxf: Drawing,
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  // formatWidth: number,
  cols2: number,
  rows2: number,
  remainder2: number
): void => {
  const numLines2 = Math.floor(formatLength / rectLength)
  const sharedLine =
    rectLength * numLines2 > cols2 * rectWidth
      ? rectLength * numLines2
      : cols2 * rectWidth

  // Draw horizontal lines for both
  for (let i = 0; i < rows2; i++) {
    const y = rectLength * i
    dxf.drawLine(0, y, cols2 * rectWidth, y)
  }

  // Draw vertical lines for both
  for (let j = 0; j <= cols2; j++) {
    const x = rectWidth * j
    dxf.drawLine(x, 0, x, rows2 * rectLength)
  }

  if (remainder2 < rectWidth) {
    // Final Horizontal Line
    dxf.drawLine(0, rectLength * rows2, cols2 * rectWidth, rectLength * rows2)
  } else {
    // Additional Vertical Lines
    for (let j = 0; j <= numLines2; j++) {
      const x = rectLength * j
      dxf.drawLine(x, rows2 * rectLength, x, rows2 * rectLength + rectWidth)
    }
    // Shared Horizontal Line
    dxf.drawLine(0, rows2 * rectLength, sharedLine, rows2 * rectLength)
    // Additional Horizontal Line
    dxf.drawLine(
      0,
      rows2 * rectLength + rectWidth,
      rectLength * numLines2,
      rows2 * rectLength + rectWidth
    )
  }
}
