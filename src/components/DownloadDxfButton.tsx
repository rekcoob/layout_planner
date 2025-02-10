import { useDxfContent } from '../hooks/useDxfContent'
import { downloadBlob } from '../utils/downloadBlob'
import TagManager from 'react-gtm-module'

export default function DownloadDxfButton() {
  const { getDxfContent } = useDxfContent()

  const handleClick = async () => {
    // ✅ Send GTM event
    TagManager.dataLayer({
      dataLayer: {
        event: 'button_click',
        button_name: 'Download DXF',
      },
    })
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
