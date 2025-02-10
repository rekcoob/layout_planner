import { useDxfContent } from '../hooks/useDxfContent'
import { downloadBlob } from '../utils/downloadBlob'
import ReactGA from 'react-ga4'

export default function DownloadDxfButton() {
  const { getDxfContent } = useDxfContent()

  const handleClick = async () => {
    // ✅ Send GTM event
    ReactGA.event({
      category: 'User',
      action: 'Clicked Download Button',
      label: 'Download DXF',
    })
    const dxfContent = getDxfContent()
    const filename = 'drawing.dxf'
    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    downloadBlob(blob, filename)
  }
  // console.log('[Download Button] rendered')
  return (
    <>
      <button className='btn primary' onClick={() => handleClick()}>
        Download DXF
      </button>
    </>
  )
}
