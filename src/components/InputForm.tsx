import React from 'react'
import { useAppContext } from '../context/AppContext'
import styles from './InputForm.module.css'

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
    <div className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <div className={styles.inputField}>
          <input
            type='number'
            id='rect-length'
            value={rectLength}
            onChange={(e) => setRectLength(Number(e.target.value))}
          />
          <label htmlFor='rect-length'>Rectangle Length</label>
        </div>
        <div className={styles.inputField}>
          <input
            type='number'
            id='rect-width'
            value={rectWidth}
            onChange={(e) => setRectWidth(Number(e.target.value))}
          />
          <label htmlFor='rect-width'>Rectangle Width</label>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputField}>
          <input
            type='number'
            id='format-length'
            value={formatLength}
            onChange={(e) => setFormatLength(Number(e.target.value))}
          />
          <label htmlFor='format-length'>Format Length</label>
        </div>
        <div className={styles.inputField}>
          <input
            type='number'
            id='format-width'
            value={formatWidth}
            onChange={(e) => setFormatWidth(Number(e.target.value))}
          />
          <label htmlFor='format-width'>Format Width</label>
        </div>
      </div>
    </div>
  )
}
export default InputForm
