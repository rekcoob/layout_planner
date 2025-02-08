import Drawing from 'dxf-writer'

export const drawLengthwiseLayout = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number,
  cols: number,
  rows: number,
  remainder: number
): string => {
  // const { rectLength, rectWidth, formatWidth, cols, rows, remainder } = params
  const numLinesVertical = Math.floor(formatWidth / rectLength)
  const sharedLine =
    rectLength * numLinesVertical > rows * rectWidth
      ? rectLength * numLinesVertical
      : rows * rectWidth

  // const numLinesHorizontal = rows

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

  // Additional lines based on remaining space
  if (remainder < rectWidth) {
    // Final Vertical Line
    dxf.drawLine(rectLength * cols, 0, rectLength * cols, rows * rectWidth)
  } else {
    // Additional Horizontal Lines
    for (let i = 0; i <= numLinesVertical; i++) {
      const y = rectLength * i
      dxf.drawLine(cols * rectLength, y, cols * rectLength + rectWidth, y)
    }
    // Shared Vertical Line
    dxf.drawLine(
      cols * rectLength,
      0,
      cols * rectLength,
      // here problem
      // rectLength * numLinesVertical
      sharedLine
    )
    // Additional Vertical Line
    dxf.drawLine(
      cols * rectLength + rectWidth,
      0,
      cols * rectLength + rectWidth,
      rectLength * numLinesVertical
    )
  }

  return dxf.toDxfString()
}

export const drawCrosswiseLayout = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number,
  cols: number,
  rows: number,
  remainder: number
): string => {
  // const { rectLength, rectWidth, formatLength, cols, rows, remainder } = params
  const numLinesVertical = Math.floor(formatLength / rectLength)
  const sharedLine =
    rectLength * numLinesVertical > cols * rectWidth
      ? rectLength * numLinesVertical
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

  if (remainder < rectWidth) {
    // Final Horizontal Line
    dxf.drawLine(0, rectLength * rows, cols * rectWidth, rectLength * rows)
  } else {
    // Additional Vertical Lines
    for (let j = 0; j <= numLinesVertical; j++) {
      const x = rectLength * j
      dxf.drawLine(x, rows * rectLength, x, rows * rectLength + rectWidth)
    }
    // Shared Horizontal Line
    dxf.drawLine(0, rows * rectLength, sharedLine, rows * rectLength)
    // Additional Horizontal Line
    dxf.drawLine(
      0,
      rows * rectLength + rectWidth,
      numLinesVertical * rectLength,
      rows * rectLength + rectWidth
    )
  }

  return dxf.toDxfString()
}
