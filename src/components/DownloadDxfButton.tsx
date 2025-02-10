import { useAppContext } from '../context/AppContext'
// import { downloadFile } from '../utils/downloadFile'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import { downloadBlob } from '../utils/downloadBlob'
import { drawLengthwiseLayout, drawCrosswiseLayout } from '../utils/drawDxf'

export default function DownloadDxfButton() {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()
  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const handleClick = async () => {
    // Compares total number of rectangles and downloads the better solution.
    const dxfContent =
      lengthwise.adjustedTotal >= crosswise.adjustedTotal
        ? drawLengthwiseLayout(
            rectLength,
            rectWidth,
            formatLength,
            formatWidth,
            lengthwise.cols,
            lengthwise.rows,
            lengthwise.remainder
          )
        : drawCrosswiseLayout(
            rectLength,
            rectWidth,
            formatLength,
            formatWidth,
            crosswise.cols,
            crosswise.rows,
            crosswise.remainder
          )

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
