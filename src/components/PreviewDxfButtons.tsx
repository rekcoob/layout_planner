import { useState, useEffect, useRef } from 'react'
import { DxfViewer, DxfViewerLoadParams, DxfViewerOptions } from 'dxf-viewer'
import { useDxfContent } from '../hooks/useDxfContent'
import TagManager from 'react-gtm-module'
import { ICustomDxfViewerOptions, ICustomDxfLoadParams } from '../types'

export default function PreviewDxfButtons() {
  const [dxfBlob, setDxfBlob] = useState<Blob | null>(null)
  const [showDxf, setShowDxf] = useState(false)
  const [activeButton, setActiveButton] = useState<
    'lengthwise' | 'crosswise' | null
  >(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<DxfViewer | null>(null)

  // const { getDxfContent } = useDxfContent()
  const { getDxfBlob } = useDxfContent()

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
      // Cast the options to DxfViewerOptions to satisfy TypeScript
      const options: ICustomDxfViewerOptions = {
        autoResize: true,
        antialias: false,
      }
      const dxfViewer = new DxfViewer(
        containerRef.current,
        options as DxfViewerOptions
      )
      const url = URL.createObjectURL(dxfBlob)
      const loadParams: ICustomDxfLoadParams = { url }

      dxfViewer
        .Load(loadParams as DxfViewerLoadParams)
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

  const handleClickLengthwise = async () => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'button_click',
        button_name: 'Preview Legthwise',
      },
    })
    const blob = getDxfBlob('lengthwise')
    setDxfBlob(blob)
    setActiveButton('lengthwise')
    setShowDxf(true)
  }

  const handleClickCrosswise = async () => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'button_click',
        button_name: 'Preview Crosswise',
      },
    })

    const blob = getDxfBlob('crosswise')
    setDxfBlob(blob)
    setActiveButton('crosswise')
    setShowDxf(true)
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClickLengthwise()
        }}
        className={`btn-sm ${activeButton === 'lengthwise' ? 'active' : ''}`}
      >
        Preview Lengthwise
      </button>
      <button
        onClick={() => {
          handleClickCrosswise()
        }}
        className={`btn-sm ${activeButton === 'crosswise' ? 'active' : ''}`}
      >
        Preview Crosswise
      </button>
      {showDxf && (
        <div
          ref={containerRef}
          className='border'
          style={{
            width: '70%',
            height: '500px',
            justifySelf: 'center',
            marginTop: '1rem',
            overflow: 'hidden',
          }}
        />
      )}
    </div>
  )
}
