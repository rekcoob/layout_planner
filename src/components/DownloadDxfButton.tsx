import { useDxfContent } from '../hooks/useDxfContent'
import { downloadBlob } from '../utils/downloadBlob'

export default function DownloadDxfButton() {
  const { getDxfContent } = useDxfContent()

  const handleClick = async () => {
    const dxfContent = getDxfContent()
    const filename = 'drawing.dxf'
    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    downloadBlob(blob, filename)
  }

  return (
    <>
      <button className='btn primary' onClick={() => handleClick()}>
        Download DXF
      </button>
    </>
  )
}
