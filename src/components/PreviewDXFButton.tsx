import React, { useState, useEffect } from 'react'
import { DxfViewer } from 'dxf-viewer'
import { useAppContext } from '../context/AppContext'
import { downloadFile } from '../utils/downloadFile'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { drawLengthwiseLayout, drawCrosswiseLayout } from '../utils/drawDxf'

export default function PreviewDXFButton() {
  const [showDxf, setShowDxf] = useState(false)
  const [dxfBlob, setDxfBlob] = useState<Blob | null>(null)

  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const handleClick = async () => {
    const dxfContent = drawLengthwiseLayout(
      rectLength,
      rectWidth,
      formatLength,
      formatWidth,
      lengthwise.cols,
      lengthwise.rows,
      lengthwise.remainderLength
    )

    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    setDxfBlob(blob)
  }

  useEffect(() => {
    if (showDxf && dxfBlob) {
      const domContainer = document.getElementById(
        'dxf-viewer-container'
      ) as HTMLElement

      if (domContainer) {
        const viewer = new DxfViewer(domContainer, null)

        // Vytvoríme URL z Blobu
        const blobUrl = window.URL.createObjectURL(dxfBlob)

        viewer.Load({
          url: blobUrl,
        })

        return () => {
          window.URL.revokeObjectURL(blobUrl)
        }
      }
    }
  }, [showDxf, dxfBlob])

  return (
    <div>
      <h2>DXF Viewer</h2>
      <button
        onClick={() => {
          handleClick()
          setShowDxf(true)
        }}
        className='btn-primary'
      >
        Zobraziť DXF (Lengthwise)
      </button>
      <button
        onClick={() => {
          setShowDxf(true)
        }}
        className='btn-primary'
      >
        Zobraziť DXF (Crosswise)
      </button>
      {showDxf && (
        <div
          id='dxf-viewer-container'
          style={{ width: '800px', height: '600px', marginTop: '20px' }}
        ></div>
      )}
    </div>
  )
}
