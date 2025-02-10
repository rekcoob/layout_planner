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
    <div className='results'>
      <h2>Layout Calculation </h2>
      {/* <div className='flex center'> */}
      <div className='flex center'>
        {/* <div style={{ margin: '20px' }}> */}
        <div className='single-result'>
          <h3>Lengthwise</h3>
          <p>
            <strong>Columns (length):</strong> {lengthwise.cols}
            <br />
            <strong>Rows (width):</strong> {lengthwise.rows}
            <br />
            <strong>Total rectangles:</strong> {lengthwise.total}
            <br />
            {/* OREZ */}
            {/* Toto je iba na test potom to pojde prec */}
            <strong>Adjusted Total rectangles:</strong>{' '}
            {lengthwise.adjustedTotal}
            <br />
            <strong>Remainder:</strong> {lengthwise.remainder}
          </p>
        </div>

        <div>
          <h3>Crosswise</h3>
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
            <strong>Remainder:</strong> {crosswise.remainder}
          </p>
        </div>
      </div>

      <div className='best-option'>
        <h3>Best Option</h3>
        {/* mb different color ?  */}
        <p>{bestOptionMessage}</p>
        <p>
          <strong>Total Rectangles:</strong>{' '}
          {lengthwise.adjustedTotal > crosswise.adjustedTotal
            ? lengthwise.adjustedTotal
            : crosswise.adjustedTotal}
          <br />
        </p>
      </div>
    </div>
  )
}

export default LayoutResults
