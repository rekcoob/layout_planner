import React from 'react'
import Drawing from 'dxf-writer'
import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'

const DownloadDXF: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  // const { cols1, rows1, total1, remainder, totalRectangles } =
  const { cols1, rows1 } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const generateDXF = () => {
    const dxf = new Drawing()

    // dxf
    //   .drawLine(0, 0, cols1 * rectLength, 0)
    //   .drawLine(0, rectWidth, cols1 * rectLength, rectWidth)
    //   .drawLine(0, rectWidth * 2, cols1 * rectLength, rectWidth * 2)
    //   .drawLine(0, rectWidth * 3, cols1 * rectLength, rectWidth * 3)

    // Draw horizontal lines
    for (let i = 0; i <= rows1; i++) {
      const y = rectWidth * i
      dxf.drawLine(0, y, cols1 * rectLength, y)
    }

    // Draw vertical lines
    for (let j = 0; j <= cols1; j++) {
      const x = rectLength * j
      dxf.drawLine(x, 0, x, rows1 * rectWidth)
    }

    // dxf.drawLine(0, 0, 0, rows1 * rectWidth)

    // Convert the DXF to a string
    const dxfString = dxf.toDxfString()

    // Create a Blob for the DXF data
    const blob = new Blob([dxfString], { type: 'application/dxf' })

    // Create a temporary download link
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'drawing.dxf'
    link.click()

    // Cleanup the URL object
    URL.revokeObjectURL(link.href)
  }

  return (
    <div>
      {/* <h3>Download DXF File</h3> */}
      <button className='download-btn' onClick={generateDXF}>
        Download DXF
      </button>
    </div>
  )
}

export default DownloadDXF
