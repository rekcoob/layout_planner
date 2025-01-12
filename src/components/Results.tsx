import React from 'react'
import { useAppContext } from '../context/AppContext'
// import { calculateLayout } from '../services/calculations'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'

const Results: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  const {
    cols1,
    rows1,
    total1,
    adjustedTotal1,
    remainder1,
    cols2,
    rows2,
    total2,
    adjustedTotal2,
    remainder2,
    totalRectangles,
  } = useCalculatedLayout(rectLength, rectWidth, formatLength, formatWidth)

  let bestOptionMessage
  if (adjustedTotal1 > adjustedTotal2) {
    bestOptionMessage = <strong>Option 1 (Lengthwise) is better.</strong>
  } else if (adjustedTotal2 > adjustedTotal1) {
    bestOptionMessage = <strong>Option 2 (Crosswise) is better.</strong>
  } else {
    bestOptionMessage = (
      <strong>Both options produce the same number of rectangles.</strong>
    )
  }

  return (
    <div>
      <h3>Calculation</h3>
      <p>
        <strong>Rectangle dimensions:</strong> {rectLength} x {rectWidth}
      </p>
      <p>
        <strong>Format dimensions:</strong> {formatLength} x {formatWidth}
      </p>

      <h4>Option 1: Lengthwise</h4>
      <p>
        <strong>Columns (length):</strong> {cols1}
        <br />
        <strong>Rows (width):</strong> {rows1}
        <br />
        <strong>Total rectangles:</strong> {total1}
        <br />
        <strong>Adjusted Total rectangles:</strong> {adjustedTotal1}
        <br />
        <strong>Remainder:</strong> {remainder1}
      </p>

      <h4>Option 2: Crosswise</h4>
      <p>
        <strong>Columns (width):</strong> {cols2}
        <br />
        <strong>Rows (length):</strong> {rows2}
        <br />
        <strong>Total rectangles:</strong> {total2}
        <br />
        <strong>Adjusted Total rectangles:</strong> {adjustedTotal2}
        <br />
        <strong>Remainder:</strong> {remainder2}
      </p>

      <h4>Best Option</h4>
      <p>
        <strong>Total Rectangles:</strong> {totalRectangles}
        <br />
        {bestOptionMessage}
      </p>
    </div>
  )
}

export default Results
