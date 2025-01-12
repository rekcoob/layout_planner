import React from 'react'
import Drawing from 'dxf-writer'
import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { drawLengthwiseLayout } from '../utils/drawLengthWiseLayout'
import { drawCrosswiseLayout } from '../utils/drawCrosswiseLayout'
import { downloadBlob } from '../utils/downloadBlob'

const DownloadDXF: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()
  const {
    cols1,
    // rows1,
    // remainder1,
    adjustedTotal1,
    cols2,
    rows2,
    // remainder2,
    adjustedTotal2,
  } = useCalculatedLayout(rectLength, rectWidth, formatLength, formatWidth)

  const isLengthwise = adjustedTotal1 >= adjustedTotal2

  const generateAndDownloadDXF = () => {
    const dxf = new Drawing()

    if (isLengthwise) {
      drawLengthwiseLayout(
        dxf,
        rectLength,
        rectWidth,
        formatLength,
        formatWidth,
        cols1
        // rows1
      )
    } else {
      drawCrosswiseLayout(
        dxf,
        rectLength,
        rectWidth,
        formatLength,
        formatWidth,
        cols2,
        rows2
        // remainder2
      )
    }

    const dxfString = dxf.toDxfString()
    const blob = new Blob([dxfString], { type: 'application/dxf' })

    // Použijeme downloadBlob na stiahnutie DXF súboru
    downloadBlob(blob, 'drawing.dxf')
  }

  return (
    <div>
      <button className='download-btn' onClick={generateAndDownloadDXF}>
        Download DXF
      </button>
    </div>
  )
}

export default DownloadDXF
