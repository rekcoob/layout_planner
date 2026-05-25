import { useDxfContent } from '../hooks/useDxfContent'
import { downloadBlob } from '../utils/downloadBlob'
import ReactGA from 'react-ga4'
import styles from './DownloadDxfButton.module.css'

export default function DownloadDxfButton() {
  const { getDxfContent } = useDxfContent()

  const handleClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Download Button',
      label: 'Download DXF',
    })
    const dxfContent = getDxfContent()
    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    downloadBlob(blob, 'drawing.dxf')
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={handleClick}>
        Download DXF
      </button>
    </div>
  )
}
