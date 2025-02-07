import React from 'react'
import { useAppContext } from '../context/AppContext'
import styles from './DownloadDXFButton.module.css'
import { downloadFile } from '../utils/downloadFile'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'

const DownloadDXFButton: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const handleClick = async () => {
    downloadFile(
      rectLength,
      rectWidth,
      formatLength,
      formatWidth,
      lengthwise.cols,
      lengthwise.rows,
      lengthwise.remainderLength
    )
  }

  // console.log('Button rendered!')

  return (
    <div>
      <button
        className={styles.downloadBtn}
        // onClick={() => downloadDXF(isLengthwise ? 'lengthwise' : 'crosswise')}
        onClick={() => handleClick()}
      >
        Download DXF
      </button>
    </div>
  )
}

export default DownloadDXFButton
