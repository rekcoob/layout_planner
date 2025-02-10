import { useAppContext } from '../context/AppContext'

// This Component is only for testing purpose

export default function StateChanger() {
  const { setRectLength, setRectWidth, setFormatLength, setFormatWidth } =
    useAppContext()

  const setOption1 = () => {
    setRectLength(240)
    setRectWidth(100)
    setFormatLength(1995)
    setFormatWidth(1000)
  }

  const setOption2 = () => {
    setRectLength(240)
    setRectWidth(100)
    setFormatLength(2020)
    setFormatWidth(1000)
  }

  const setOption3 = () => {
    setRectLength(20)
    setRectWidth(9)
    setFormatLength(210)
    setFormatWidth(100)
  }

  const setOption4 = () => {
    setRectLength(240)
    setRectWidth(100)
    setFormatLength(1995)
    setFormatWidth(740)
  }

  const setOption5 = () => {
    setRectLength(240)
    setRectWidth(100)
    setFormatLength(1995)
    setFormatWidth(880)
  }

  const setOption6 = () => {
    setRectLength(240)
    setRectWidth(100)
    setFormatLength(1900)
    setFormatWidth(880)
  }

  return (
    <div>
      <div className='flex center' style={{ gap: '30px' }}>
        <label className='flex-col'>
          <input type='radio' name='dimension-option' onChange={setOption1} />
          LW
        </label>
        <label className='flex-col'>
          <input type='radio' name='dimension-option' onChange={setOption2} />
          LW-rem
        </label>
        <label className='flex-col'>
          <input type='radio' name='dimension-option' onChange={setOption3} />
          LW-line
        </label>
        <label className='flex-col'>
          <input type='radio' name='dimension-option' onChange={setOption4} />
          CW
        </label>
        <label className='flex-col'>
          <input type='radio' name='dimension-option' onChange={setOption5} />
          CW-rem
        </label>
        <label className='flex-col'>
          <input type='radio' name='dimension-option' onChange={setOption6} />
          CW-line
        </label>
      </div>
    </div>
  )
}
