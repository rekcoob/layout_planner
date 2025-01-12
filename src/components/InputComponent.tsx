import React from 'react'
import { useAppContext } from '../context/AppContext'

const InputComponent: React.FC = () => {
  const {
    rectLength,
    rectWidth,
    formatLength,
    formatWidth,
    setRectLength,
    setRectWidth,
    setFormatLength,
    setFormatWidth,
  } = useAppContext()

  return (
    <div>
      <div>
        <label>
          Rectangle (length x width):{' '}
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
          Format (length x width):{' '}
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
    </div>
  )
}

export default InputComponent
