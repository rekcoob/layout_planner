import { useAppContext } from '../context/AppContext'
import { downloadFile } from '../utils/downloadFile'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { downloadBlob } from '../utils/downloadBlob'
import { drawLengthwiseLayout } from '../utils/drawDxf'

export default function DownloadDxfButton() {
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
      lengthwise.remainderLength
    )

    const filename = 'drawing.dxf'

    const blob = new Blob([dxfContent], { type: 'application/dxf' })
    downloadBlob(blob, filename)
  }

  return (
    <>
      <button
        className='primary'
        // onClick={() => downloadDXF(isLengthwise ? 'lengthwise' : 'crosswise')}
        onClick={() => handleClick()}
      >
        Download DXF
      </button>
    </>
  )
}
