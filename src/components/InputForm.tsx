import { useAppContext } from '../context/AppContext'

export default function InputForm() {
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
      <div className='form-group'>
        <label htmlFor='rect-length'>Rectangle Length</label>
        <input
          type='number'
          value={rectLength}
          onChange={(e) => setRectLength(Number(e.target.value))}
        />

        <label htmlFor='rec-width'>Rectangle Width</label>
        <input
          type='number'
          value={rectWidth}
          onChange={(e) => setRectWidth(Number(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='format-length'>Format Length</label>
        <input
          id='format-length'
          type='number'
          value={formatLength}
          onChange={(e) => setFormatLength(Number(e.target.value))}
        />
        <label htmlFor='format-width'>Format Width</label>
        <input
          id='format-width'
          type='number'
          value={formatWidth}
          onChange={(e) => setFormatWidth(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
