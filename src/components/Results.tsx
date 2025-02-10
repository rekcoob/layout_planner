import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'

export default function LayoutResults() {
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
        <>
          <span style={{ color: 'var(--primary-color' }}>Lengthwise</span> is
          better.
        </>
      ) : lengthwise.adjustedTotal < crosswise.adjustedTotal ? (
        <>
          <span style={{ color: 'var(--primary-color' }}>Crosswise</span> is
          better.
        </>
      ) : (
        <>Both options produce the same number of rectangles.</>
      )}
    </>
  )
  // console.log('Layout rendered!')
  return (
    <div>
      <h2 style={{ marginTop: '5px' }}>Calculation </h2>

      <div className='results'>
        <div className='single-result'>
          <h3>Lengthwise</h3>
          <p>
            <strong>Columns (length):</strong> {lengthwise.cols}
            <br />
            <strong>Rows (width):</strong> {lengthwise.rows}
            <br />
            {/* <strong>Total rectangles:</strong> {lengthwise.total} */}
            <strong>Total rectangles:</strong> {lengthwise.adjustedTotal}
            <br />
            {/* Cut Remainder */}
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
            {/* <strong>Total rectangles:</strong> {crosswise.total} */}
            <strong>Total rectangles:</strong> {crosswise.adjustedTotal}
            <br />
            <strong>Remainder:</strong> {crosswise.remainder}
          </p>
        </div>
      </div>

      <div className='best-option'>
        <h3>Best Option</h3>
        <h2>{bestOptionMessage}</h2>
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
