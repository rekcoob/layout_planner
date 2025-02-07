import { createDXFLayout } from '../utils/DXFService'
import { calculateLayout } from '../utils/calculateLayout'
import { downloadBlob } from '../utils/downloadBlob'

export const useDXFManager = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
) => {
  const { lengthwise, crosswise } = calculateLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const downloadDXF = (layoutType: 'lengthwise' | 'crosswise') => {
    const layout = layoutType === 'lengthwise' ? lengthwise : crosswise

    const dxf = createDXFLayout({
      layoutType,
      rectLength,
      rectWidth,
      formatLength,
      formatWidth,
      layout,
    })

    const blob = new Blob([dxf.toDxfString()], { type: 'application/dxf' })
    downloadBlob(blob, 'drawing.dxf')
  }

  return { lengthwise, crosswise, downloadDXF }
}
