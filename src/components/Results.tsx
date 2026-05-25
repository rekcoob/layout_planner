import { useAppContext } from '../context/AppContext'
import { useCalculatedLayout } from '../hooks/useCalculatedLayout'
import styles from './Results.module.css'

export default function LayoutResults() {
  const { rectLength, rectWidth, formatLength, formatWidth } = useAppContext()
  const { lengthwise, crosswise } = useCalculatedLayout(
    rectLength,
    rectWidth,
    formatLength,
    formatWidth
  )

  const isLengthwiseBetter = lengthwise.adjustedTotal > crosswise.adjustedTotal
  const isCrosswiseBetter = crosswise.adjustedTotal > lengthwise.adjustedTotal
  const bestTotal = Math.max(lengthwise.adjustedTotal, crosswise.adjustedTotal)
  const bestLabel = isLengthwiseBetter ? 'Lengthwise' : isCrosswiseBetter ? 'Crosswise' : 'Equal'
  const bestColor = isLengthwiseBetter
    ? 'var(--primary)'
    : isCrosswiseBetter
    ? 'var(--secondary)'
    : 'var(--text-muted)'

  return (
    <div className={styles.wrapper}>
      <p className={styles.sectionTitle}>Calculation</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Lengthwise</p>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Columns</span>
            <span className={styles.statValue}>{lengthwise.cols}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Rows</span>
            <span className={styles.statValue}>{lengthwise.rows}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{lengthwise.adjustedTotal}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Remainder</span>
            <span className={styles.statValue}>{lengthwise.remainder}</span>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>Crosswise</p>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Columns</span>
            <span className={styles.statValue}>{crosswise.cols}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Rows</span>
            <span className={styles.statValue}>{crosswise.rows}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{crosswise.adjustedTotal}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Remainder</span>
            <span className={styles.statValue}>{crosswise.remainder}</span>
          </div>
        </div>
      </div>

      <div className={styles.bestCard}>
        <p className={styles.bestLabel}>Best Option</p>
        <p className={styles.bestOrientation} style={{ color: bestColor }}>
          {bestLabel}
        </p>
        <p className={styles.bestTotalRow}>
          Total <span className={styles.bestTotalValue}>{bestTotal}</span>
        </p>
      </div>
    </div>
  )
}
