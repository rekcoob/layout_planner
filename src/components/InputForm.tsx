import { useAppContext } from '../context/AppContext'
import styles from './InputForm.module.css'

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

  return (
    <div className={styles.formContainer}>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Rectangle</p>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='rect-length'>Length</label>
          <input
            id='rect-length'
            className={styles.input}
            type='number'
            value={rectLength}
            onChange={(e) => setRectLength(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='rect-width'>Width</label>
          <input
            id='rect-width'
            className={styles.input}
            type='number'
            value={rectWidth}
            onChange={(e) => setRectWidth(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.card}>
        <p className={styles.cardTitle}>Format</p>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='format-length'>Length</label>
          <input
            id='format-length'
            className={styles.input}
            type='number'
            value={formatLength}
            onChange={(e) => setFormatLength(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='format-width'>Width</label>
          <input
            id='format-width'
            className={styles.input}
            type='number'
            value={formatWidth}
            onChange={(e) => setFormatWidth(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
