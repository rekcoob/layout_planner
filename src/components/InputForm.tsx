import React from 'react'
import { useAppContext } from '../context/AppContext'

const InputForm: React.FC = () => {
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

  // console.log('InputForm rendered!')

  return (
    <div className='form-container'>
      <div className='input-group'>
        <div className='input-field'>
          <label htmlFor='rect-length'>Rectangle Length</label>
          <input
            type='number'
            value={rectLength}
            onChange={(e) => setRectLength(Number(e.target.value))}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='rect-width'>Rectangle Width</label>
          <input
            type='number'
            value={rectWidth}
            onChange={(e) => setRectWidth(Number(e.target.value))}
          />
        </div>
      </div>
      <div className='input-group'>
        <div className='input-field'>
          <label htmlFor='format-length'>Format Length</label>
          <input
            type='number'
            id='format-length'
            value={formatLength}
            onChange={(e) => setFormatLength(Number(e.target.value))}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='format-width'>Format Width</label>
          <input
            type='number'
            id='format-width'
            value={formatWidth}
            onChange={(e) => setFormatWidth(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
export default InputForm
