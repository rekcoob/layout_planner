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

// types/dxfViewer.ts
export interface ICustomDxfViewerOptions {
  canvasWidth?: number
  canvasHeight?: number
  autoResize?: boolean
  clearAlpha?: number
  antialias?: boolean
  pointSize?: number
  colorCorrection?: boolean
  blackWhiteInversion?: boolean
  fileEncoding?: string
  retainParsedDxf?: boolean
  preserveDrawingBuffer?: boolean
}

// Pomocný typ pre load parametre
export interface ICustomDxfLoadParams {
  url: string
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
