import React, { useState, useEffect } from 'react'
import { createDXFLayout } from '../utils/DXFService'
import { DxfViewer } from 'dxf-viewer'
import { useDXFManager } from '../hooks/useDXFManager'
import { useAppContext } from '../context/AppContext'

const PreviewDXFButton: React.FC = () => {
  const [showDxf, setShowDxf] = useState(false)
  const [dxfBlob, setDxfBlob] = useState<Blob | null>(null)

  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  // Hook pre získanie dát z DXFManageru
  const { lengthwise, crosswise } = useDXFManager(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )
  // Generovanie DXF blobu z hooku
  const generateDxfBlob = (layoutType: 'lengthwise' | 'crosswise') => {
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
    setDxfBlob(blob)
  }

  // Zobrazenie DXF v prehliadači
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
          url: blobUrl, // Použijeme Blob URL na načítanie DXF
        })

        // Čistíme URL po načítaní
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
          generateDxfBlob('lengthwise')
          setShowDxf(true)
        }}
        className='btn-primary'
      >
        Zobraziť DXF (Lengthwise)
      </button>
      <button
        onClick={() => {
          generateDxfBlob('crosswise')
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

export default PreviewDXFButton
