import Drawing from 'dxf-writer'

export const drawLengthwiseLayout = (
  rectLength: number,
  rectWidth: number,
  _formatLength: number,
  formatWidth: number,
  cols: number,
  rows: number,
  remainder: number
): string => {
  // extraLines and sharedLine are specific to the layout (lengthwise)
  const extraLines = Math.floor(formatWidth / rectLength)
  const sharedLine =
    rectLength * extraLines > rows * rectWidth
      ? rectLength * extraLines
      : rows * rectWidth

  const dxf = new Drawing()

  // Draw horizontal lines for both (rows)
  for (let i = 0; i <= rows; i++) {
    const y = rectWidth * i
    dxf.drawLine(0, y, cols * rectLength, y)
  }
  // Draw vertical lines for both (columns)
  for (let j = 0; j < cols; j++) {
    const x = rectLength * j
    dxf.drawLine(x, 0, x, rows * rectWidth)
  }

  // Decide if there is space for another rectangles in the opposite direction
  if (remainder < rectWidth) {
    // Final Vertical Line if no additional rectangles
    dxf.drawLine(rectLength * cols, 0, rectLength * cols, rows * rectWidth)
  } else {
    // Additional Horizontal Lines - extraLines
    for (let i = 0; i <= extraLines; i++) {
      const y = rectLength * i
      dxf.drawLine(cols * rectLength, y, cols * rectLength + rectWidth, y)
    }
    // Shared Vertical Line
    dxf.drawLine(cols * rectLength, 0, cols * rectLength, sharedLine)
    // Additional Vertical Line
    dxf.drawLine(
      cols * rectLength + rectWidth,
      0,
      cols * rectLength + rectWidth,
      rectLength * extraLines
    )
  }

  return dxf.toDxfString()
}

export const drawCrosswiseLayout = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  _formatWidth: number,
  cols: number,
  rows: number,
  remainder: number
): string => {
  // extraLines and sharedLine are specific to the layout (crosswise)
  const extraLines = Math.floor(formatLength / rectLength)
  const sharedLine =
    rectLength * extraLines > cols * rectWidth
      ? rectLength * extraLines
      : cols * rectWidth

  const dxf = new Drawing()

  // Draw horizontal lines both (rows)
  for (let i = 0; i < rows; i++) {
    const y = rectLength * i
    dxf.drawLine(0, y, cols * rectWidth, y)
  }
  // Draw vertical lines both (columns)
  for (let j = 0; j <= cols; j++) {
    const x = rectWidth * j
    dxf.drawLine(x, 0, x, rows * rectLength)
  }

  // Decide if there is space for another rectangles in the opposite direction
  if (remainder < rectWidth) {
    // Final Horizontal Line if no additional rectangles
    dxf.drawLine(0, rectLength * rows, cols * rectWidth, rectLength * rows)
  } else {
    // Additional Vertical Lines - extraLines
    for (let j = 0; j <= extraLines; j++) {
      const x = rectLength * j
      dxf.drawLine(x, rows * rectLength, x, rows * rectLength + rectWidth)
    }
    // Shared Horizontal Line
    dxf.drawLine(0, rows * rectLength, sharedLine, rows * rectLength)
    // Additional Horizontal Line
    dxf.drawLine(
      0,
      rows * rectLength + rectWidth,
      extraLines * rectLength,
      rows * rectLength + rectWidth
    )
  }

  return dxf.toDxfString()
}
