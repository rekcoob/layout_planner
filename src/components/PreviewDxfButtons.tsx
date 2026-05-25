import { useState, useEffect, useRef } from 'react'
import { DxfViewer, DxfViewerLoadParams, DxfViewerOptions } from 'dxf-viewer'
import { useDxfContent } from '../hooks/useDxfContent'
import ReactGA from 'react-ga4'
import { ICustomDxfViewerOptions } from '../types'
import styles from './PreviewDxfButtons.module.css'

export default function PreviewDxfButtons() {
  const [dxfBlob, setDxfBlob] = useState<Blob | null>(null)
  const [showDxf, setShowDxf] = useState(false)
  const [activeButton, setActiveButton] = useState<'lengthwise' | 'crosswise' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<DxfViewer | null>(null)

  const { getDxfBlob } = useDxfContent()

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.Destroy()
      viewerRef.current = null
    }
    if (dxfBlob && showDxf && containerRef.current) {
      const options: ICustomDxfViewerOptions = { autoResize: true, antialias: false }
      const dxfViewer = new DxfViewer(containerRef.current, options as DxfViewerOptions)
      const url = URL.createObjectURL(dxfBlob)
      dxfViewer
        .Load({ url } as DxfViewerLoadParams)
        .catch((error) => console.error('Failed to load DXF:', error))
        .finally(() => URL.revokeObjectURL(url))
      viewerRef.current = dxfViewer
    }
    return () => {
      if (viewerRef.current) {
        viewerRef.current.Destroy()
        viewerRef.current = null
      }
    }
  }, [dxfBlob, showDxf])

  const handleClickLengthwise = () => {
    ReactGA.event({ category: 'User', action: 'Clicked Preview Lengthwise Button', label: 'Preview DXF Lengthwise' })
    setDxfBlob(getDxfBlob('lengthwise'))
    setActiveButton('lengthwise')
    setShowDxf(true)
  }

  const handleClickCrosswise = () => {
    ReactGA.event({ category: 'User', action: 'Clicked Preview Crosswise Button', label: 'Preview DXF Crosswise' })
    setDxfBlob(getDxfBlob('crosswise'))
    setActiveButton('crosswise')
    setShowDxf(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonGroup}>
        <button
          onClick={handleClickLengthwise}
          className={`${styles.btn} ${activeButton === 'lengthwise' ? styles.active : ''}`}
        >
          Preview Lengthwise
        </button>
        <button
          onClick={handleClickCrosswise}
          className={`${styles.btn} ${activeButton === 'crosswise' ? styles.active : ''}`}
        >
          Preview Crosswise
        </button>
      </div>
      {showDxf && <div ref={containerRef} className={styles.viewerWrap} />}
    </div>
  )
}
