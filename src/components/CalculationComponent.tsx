import React from 'react'
import { useAppContext } from '../context/AppContext'

const CalculationComponent: React.FC = () => {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()

  const cols1 = Math.floor(formatLength / rectLength)
  const rows1 = Math.floor(formatWidth / rectWidth)
  const total1 = cols1 * rows1

  const ostatok = formatLength - rectLength * cols1

  let totalRectangles = null

  if (ostatok < rectWidth) {
    totalRectangles = cols1 * rows1
  } else {
    totalRectangles = cols1 * rows1 + Math.floor(formatWidth / rectLength)
  }

  return (
    <div>
      <h3>Vypocet</h3>
      <strong>Obdlznik rozmery:</strong> {rectLength} x {rectWidth}
      <br />
      <strong>Format rozmery:</strong> {formatLength} x {formatWidth}
      <h4>Obdlznikov vyjde</h4>
      <strong>pozdlzne:</strong> {cols1}
      <br />
      <strong>priecne:</strong> {rows1}
      <br />
      <strong>spolu obdlznikov:</strong> {total1}
      <br />
      <strong>Ostatok:</strong> {ostatok}
      <br />
      <strong>Total Rectangles:</strong> {totalRectangles}
    </div>
  )
}

export default CalculationComponent
