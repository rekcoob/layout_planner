// claude riesenie
import { useState, useEffect, useRef } from 'react'
import { DxfViewer, DxfViewerOptions } from 'dxf-viewer'
import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { drawLengthwiseLayout, drawCrosswiseLayout } from '../utils/drawDxf'

export default function PreviewDxfButtons() {
  const [dxfBlob, setDxfBlob] = useState<Blob | null>(null)
  const [showDxf, setShowDxf] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<DxfViewer | null>(null)

  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()
  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  useEffect(() => {
    // Cleanup previous viewer
    if (viewerRef.current) {
      viewerRef.current.Destroy()
      viewerRef.current = null
    }

    const options: DxfViewerOptions = {
      canvasWidth: 400, // Default canvas width if not using autoResize
      canvasHeight: 300, // Default canvas height if not using autoResize
      autoResize: true, // Set to true to automatically resize with container
      clearAlpha: 1.0, // Background opacity
      antialias: true, // Enable antialiasing
      pointSize: 2, // Size of point entities
      colorCorrection: false, // Adjust colors for visibility
      blackWhiteInversion: true, // Invert black/white for visibility
      fileEncoding: 'utf-8', // DXF file encoding
      retainParsedDxf: true,
      preserveDrawingBuffer: true,
    }

    if (dxfBlob && showDxf && containerRef.current) {
      const viewer = new DxfViewer(containerRef.current, options)
      const url = URL.createObjectURL(dxfBlob)
      viewer
        .Load({ url })
        .catch((error) => console.error('Failed to load DXF:', error))
        .finally(() => URL.revokeObjectURL(url))

      viewerRef.current = viewer
    }
    // Cleanup on unmount
    return () => {
      if (viewerRef.current) {
        viewerRef.current.Destroy()
        viewerRef.current = null
      }
    }
  }, [dxfBlob, showDxf])

  const handleClick = async () => {
    const dxfContent = drawLengthwiseLayout(
      rectLength,
      rectWidth,
      formatLength,
      formatWidth,
      lengthwise.cols,
      lengthwise.rows,
      lengthwise.remainder
    )
    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    setDxfBlob(blob)
  }

  const handleClickCrosswise = async () => {
    const dxfContent = drawCrosswiseLayout(
      rectLength,
      rectWidth,
      formatLength,
      formatWidth,
      crosswise.cols,
      crosswise.rows,
      crosswise.remainder
    )
    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    setDxfBlob(blob)
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClick()
          setShowDxf(true)
        }}
        className='btn-sm secondary '
      >
        Preview DXF (Lengthwise)
      </button>
      <button
        onClick={() => {
          handleClickCrosswise()
          setShowDxf(true)
        }}
        className='btn-sm secondary'
      >
        Preview DXF (Crosswise)
      </button>
      {showDxf && (
        <div
          ref={containerRef}
          className='border'
          style={{
            width: '100%',
            height: '500px',
            marginTop: '1rem',
          }}
        />
      )}
    </div>
  )
}
