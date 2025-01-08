import React from 'react'
import Drawing from 'dxf-writer'

const DownloadDXF: React.FC = () => {
  const generateDXF = () => {
    const dxf = new Drawing()

    dxf.drawLine(0, 0, 100, 100)

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
      <h3>Download DXF File</h3>
      <button onClick={generateDXF}>Download DXF</button>
    </div>
  )
}

export default DownloadDXF
