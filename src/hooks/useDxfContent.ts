import { useCalculatedLayout } from './useCalculatedLayout'
import { useAppContext } from '../context/AppContext'
import { drawCrosswiseLayout, drawLengthwiseLayout } from '../utils/drawDxf'

export const useDxfContent = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()
  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const getDxfContent = (type?: 'lengthwise' | 'crosswise') => {
    // Select the layout based on the 'type' parameter or the adjusted totals when 'type' is undefined.
    const layout =
      type === 'lengthwise'
        ? lengthwise
        : type === 'crosswise'
        ? crosswise
        : // If 'type' is undefined, compare the adjusted totals and select the larger one
        lengthwise.adjustedTotal >= crosswise.adjustedTotal
        ? lengthwise
        : crosswise

    // Render the appropriate layout based on the selected 'layout'.
    // If the selected layout is 'lengthwise', draw the lengthwise layout.
    return layout === lengthwise
      ? drawLengthwiseLayout(
          rectLength,
          rectWidth,
          formatLength,
          formatWidth,
          layout.cols,
          layout.rows,
          layout.remainder
        )
      : drawCrosswiseLayout(
          rectLength,
          rectWidth,
          formatLength,
          formatWidth,
          layout.cols,
          layout.rows,
          layout.remainder
        )
  }

  return { getDxfContent }
}
