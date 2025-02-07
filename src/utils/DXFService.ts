import Drawing from 'dxf-writer'

export const createDXFLayout = (params: {
  layoutType: 'lengthwise' | 'crosswise'
  rectLength: number
  rectWidth: number
  formatLength: number
  formatWidth: number
  layout: {
    cols: number
    rows: number
    remainder: number
  }
}): Drawing => {
  console.log('Creating DXF Layout with params:', params) // DEBUG

  const {
    layoutType,
    rectLength,
    rectWidth,
    formatLength,
    formatWidth,
    layout,
  } = params
  const dxf = new Drawing()

  const fullParams = {
    rectLength,
    rectWidth,
    formatLength,
    formatWidth,
    ...layout,
  }

  if (layoutType === 'lengthwise') {
    drawLengthwiseLayout(dxf, fullParams)
  } else {
    drawCrosswiseLayout(dxf, fullParams)
  }

  return dxf
}

const drawLengthwiseLayout = (
  dxf: Drawing,
  params: {
    rectLength: number
    rectWidth: number
    formatLength: number
    formatWidth: number
    cols: number
    rows: number
    remainder: number
  }
): void => {
  const { rectLength, rectWidth, formatWidth, cols, rows, remainder } = params
  const numLinesVertical = Math.floor(formatWidth / rectLength)
  const sharedLine =
    rectLength * numLinesVertical > rows * rectWidth
      ? rectLength * numLinesVertical
      : rows * rectWidth
  // const numLinesHorizontal = rows

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
}

const drawCrosswiseLayout = (
  dxf: Drawing,
  params: {
    rectLength: number
    rectWidth: number
    formatLength: number
    formatWidth: number
    cols: number
    rows: number
    remainder: number
  }
): void => {
  const { rectLength, rectWidth, formatLength, cols, rows, remainder } = params
  const numLinesVertical = Math.floor(formatLength / rectWidth) // number of vertical lines
  // const numLinesHorizontal = cols

  // Draw horizontal lines (rows)
  for (let i = 0; i < rows; i++) {
    const y = rectLength * i
    dxf.drawLine(0, y, cols * rectWidth, y) // Draw a horizontal line for crosswise layout
  }

  // Draw vertical lines (columns)
  for (let j = 0; j <= cols; j++) {
    const x = rectWidth * j
    dxf.drawLine(x, 0, x, rows * rectLength) // Draw a vertical line for crosswise layout
  }

  // Draw the last horizontal line to adjust remainder for rows
  if (remainder < rectWidth) {
    dxf.drawLine(0, rectLength * rows, cols * rectWidth, rectLength * rows) // Final horizontal line
  } else {
    // Add extra vertical lines to handle any remainder space
    for (let j = 0; j <= numLinesVertical; j++) {
      const x = rectLength * j
      dxf.drawLine(x, rows * rectLength, x, rows * rectLength + rectWidth) // Extra vertical lines
    }
    // Add the shared horizontal and vertical lines for crosswise arrangement
    dxf.drawLine(
      0,
      rows * rectLength,
      numLinesVertical * rectLength,
      rows * rectLength
    ) // Shared horizontal line
    dxf.drawLine(
      0,
      rows * rectLength + rectWidth,
      numLinesVertical * rectLength,
      rows * rectLength + rectWidth
    ) // Adjustment line for the remainder
  }
}
