import { useState, useEffect, useRef } from 'react'
import { DxfViewer, DxfViewerOptions } from 'dxf-viewer'
import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { drawLengthwiseLayout, drawCrosswiseLayout } from '../utils/drawDxf'

export default function PreviewDxfButtons() {
  const [dxfBlob, setDxfBlob] = useState<Blob | null>(null)
  const [showDxf, setShowDxf] = useState(false)
  const [active, setActive] = useState(false)
  const [activeButton, setActiveButton] = useState<
    'lengthwise' | 'crosswise' | null
  >(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<DxfViewer | null>(null)

  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()
  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const options: DxfViewerOptions = {
    // canvasWidth: 400, // Default canvas width if not using autoResize
    // canvasHeight: 300, // Default canvas height if not using autoResize
    autoResize: true, // Set to true to automatically resize with container
    // clearAlpha: 1.0, // Background opacity
    antialias: false, // Enable antialiasing
    // pointSize: 2, // Size of point entities
    // colorCorrection: false, // Adjust colors for visibility
    // blackWhiteInversion: true, // Invert black/white for visibility
    // fileEncoding: 'utf-8', // DXF file encoding
    // retainParsedDxf: true,
    // preserveDrawingBuffer: true,
  }

  useEffect(() => {
    // console.log('🔄 useEffect triggered')

    // Cleanup previous viewer
    if (viewerRef.current) {
      // console.log('🗑 Destroying previous viewer')
      viewerRef.current.Destroy()
      viewerRef.current = null
    }
    if (dxfBlob && showDxf && containerRef.current) {
      // console.log('✅ Creating new DxfViewer instance')
      const dxfViewer = new DxfViewer(containerRef.current, options)

      const url = URL.createObjectURL(dxfBlob)
      dxfViewer
        .Load({ url })
        .catch((error) => console.error('Failed to load DXF:', error))
        .finally(() => URL.revokeObjectURL(url))

      viewerRef.current = dxfViewer
    }
    // Cleanup on unmount
    return () => {
      // console.log('🗑 Cleaning up on unmount')
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
    setActiveButton('lengthwise')
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
    setActiveButton('crosswise')
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClick()
          setActive(true)
          setShowDxf(true)
        }}
        // className={`btn-sm ${active ? 'active' : ''}`}
        // className='btn-sm '
        className={`btn-sm ${activeButton === 'lengthwise' ? 'active' : ''}`}
      >
        Preview Lengthwise
      </button>
      <button
        onClick={() => {
          handleClickCrosswise()
          setShowDxf(true)
        }}
        // className='btn-ff'
        className={`btn-sm ${activeButton === 'crosswise' ? 'active' : ''}`}
      >
        Preview Crosswise
      </button>
      {showDxf && (
        <div
          ref={containerRef}
          className='border'
          style={{
            width: '80%',
            height: '500px',
            // marginTop: '1rem',
          }}
        />
      )}
    </div>
  )
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
