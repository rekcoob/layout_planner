import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'

const LayoutResults: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const bestOptionMessage = (
    <>
      {lengthwise.adjustedTotal > crosswise.adjustedTotal ? (
        <strong>Option 1 (Lengthwise) is better.</strong>
      ) : lengthwise.adjustedTotal < crosswise.adjustedTotal ? (
        <strong>Option 2 (Crosswise) is better.</strong>
      ) : (
        <strong>Both options produce the same number of rectangles.</strong>
      )}
    </>
  )
  // console.log('Layout rendered!')
  return (
    <div>
      <h3>Calculation</h3>
      <div className='flex'>
        <p style={{ margin: '20px' }}>
          <strong>Rectangle dimensions:</strong> {rectLength} x {rectWidth}
        </p>
        <p style={{ margin: '20px' }}>
          <strong>Format dimensions:</strong> {formatLength} x {formatWidth}
        </p>
      </div>

      <div className='flex center'>
        <div style={{ margin: '20px' }}>
          <h4>Option 1: Lengthwise</h4>
          <p>
            <strong>Columns (length):</strong> {lengthwise.cols}
            <br />
            <strong>Rows (width):</strong> {lengthwise.rows}
            <br />
            <strong>Total rectangles:</strong> {lengthwise.total}
            <br />
            <strong>Adjusted Total rectangles:</strong>{' '}
            {lengthwise.adjustedTotal}
            <br />
            <strong>Remainder:</strong> {lengthwise.remainderLength}
          </p>
        </div>

        <div style={{ margin: '20px' }}>
          <h4>Option 2: Crosswise</h4>
          <p>
            <strong>Columns (width):</strong> {crosswise.cols}
            <br />
            <strong>Rows (length):</strong> {crosswise.rows}
            <br />
            <strong>Total rectangles:</strong> {crosswise.total}
            <br />
            <strong>Adjusted Total rectangles:</strong>{' '}
            {crosswise.adjustedTotal}
            <br />
            <strong>Remainder:</strong> {crosswise.remainderWidth}
          </p>
        </div>
      </div>

      <h4>Best Option</h4>
      <p>
        <strong>Total Rectangles:</strong>{' '}
        {lengthwise.adjustedTotal < crosswise.adjustedTotal
          ? lengthwise.adjustedTotal
          : crosswise.adjustedTotal}
        <br />
        {bestOptionMessage}
      </p>
    </div>
  )
}

export default LayoutResults
