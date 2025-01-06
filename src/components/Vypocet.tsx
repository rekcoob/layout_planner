import React, { useState } from 'react'

const Vypocet: React.FC = () => {
  const [rectLength, setRectLength] = useState<number>(0)
  const [rectWidth, setRectWidth] = useState<number>(0)

  const [formatLength, setFormatLength] = useState<number>(2000)
  const [formatWidth, setFormatWidth] = useState<number>(1000)

  const cols1: number = Math.floor(formatLength / rectLength)
  const rows1: number = Math.floor(formatWidth / rectWidth)
  const total1: number = cols1 * rows1

  const ostatok = formatLength - rectLength * cols1

  let totalRectangles = null

  if (ostatok < rectWidth) {
    totalRectangles = cols1 * rows1
  } else {
    totalRectangles = cols1 * rows1 + Math.floor(formatWidth / rectLength)
  }

  return (
    <div>
      <div>
        <label>
          Obdĺžnik (dlzka x výška):{' '}
          <input
            type='number'
            value={rectLength}
            onChange={(e) => setRectLength(Number(e.target.value))}
          />
          x
          <input
            type='number'
            value={rectWidth}
            onChange={(e) => setRectWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Format (dlzka x výška):{' '}
          <input
            type='number'
            value={formatLength}
            onChange={(e) => setFormatLength(Number(e.target.value))}
          />
          x
          <input
            type='number'
            value={formatWidth}
            onChange={(e) => setFormatWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Orez: <input type='number' value='1' />
        </label>
      </div>
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
      <strong>Total REcktangles:</strong> {totalRectangles}
    </div>
  )
}

export default Vypocet
