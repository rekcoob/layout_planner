import { useState, useEffect } from 'react'
import { DxfViewer } from 'dxf-viewer'
import { useAppContext } from '../context/AppContext'
// import { downloadFile } from '../utils/downloadFile'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { drawLengthwiseLayout, drawCrosswiseLayout } from '../utils/drawDxf'

export default function PreviewDxfButtons() {
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
      {/* <div
        style={{
          width: '800px',
          height: '600px',
          marginTop: '20px',
          backgroundColor: 'black',
        }}
      ></div> */}
      {showDxf && (
        <div
          id='dxf-viewer-container'
          style={{ width: '800px', height: '600px', marginTop: '20px' }}
        ></div>
      )}
    </div>
  )
}
