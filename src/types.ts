export interface ISingleLayout {
  cols: number
  rows: number
  total: number
  adjustedTotal: number
  // remainderLength: number
  // remainderWidth: number
  remainder: number
  // optimalOrientation: string
}

export interface IBothResults {
  lengthwise: ISingleLayout
  crosswise: ISingleLayout
  // bestTotalRectangles: number
}

export interface Rectangle {
  length: number
  width: number
}

export interface LayoutDimensions {
  rectangle: Rectangle
  format: Rectangle
}

// export interface LayoutCalculation {
//   columns: number
//   rows: number
//   total: number
//   adjustedTotal: number
//   remainder: number
// }

// export interface LayoutResults {
//   lengthwise: LayoutCalculation
//   crosswise: LayoutCalculation
//   totalRectangles: number
//   optimalOrientation: 'lengthwise' | 'crosswise'
// }
