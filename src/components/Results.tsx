import React from 'react'
import { useAppContext } from '../context/AppContext'
// import { calculateLayout } from '../services/calculations'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'

const Results: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  const { cols1, rows1, total1, remainder, totalRectangles } =
    useCalculatedLayout(rectLength, rectWidth, formatLength, formatWidth)

  return (
    <div>
      <h3>Calculation</h3>
      <strong>Rectangle dimensions:</strong> {rectLength} x {rectWidth}
      <br />
      <strong>Format dimensions:</strong> {formatLength} x {formatWidth}
      <h4>Rectangles produced</h4>
      <strong>lengthwise:</strong> {cols1}
      <br />
      <strong>crosswise:</strong> {rows1}
      <br />
      <strong>total rectangles:</strong> {total1}
      <br />
      <strong>Remainder:</strong> {remainder}
      <br />
      <strong>Total Rectangles:</strong> {totalRectangles}
    </div>
  )
}

export default Results
