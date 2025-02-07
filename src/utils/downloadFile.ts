import { downloadBlob } from '../utils/downloadBlob'
import { drawLengthwiseLayout, drawCrosswiseLayout } from './drawDxf'

export const downloadFile = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number,
  cols: number,
  rows: number,
  remainder: number
) => {
  const filename = 'drawing.dxf'

  const dxfContent = drawLengthwiseLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth,
    cols,
    rows,
    remainder
  )

  const blob = new Blob([dxfContent], { type: 'application/dxf' })
  downloadBlob(blob, filename)
}
