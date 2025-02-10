import { useState, useEffect } from 'react'
import { calculateLayout } from '../utils/calculateLayout'
import { IBothResults } from '../types'

export const useCalculatedLayout = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
): IBothResults => {
  const [layout, setLayout] = useState<IBothResults>({
    lengthwise: {
      cols: 0,
      rows: 0,
      total: 0,
      adjustedTotal: 0,
      remainder: 0,
    },
    crosswise: {
      cols: 0,
      rows: 0,
      total: 0,
      adjustedTotal: 0,
      remainder: 0,
    },
  })

  useEffect(() => {
    // Perform the calculation and update the state
    const results = calculateLayout(
      rectLength,
      rectWidth,
      formatLength,
      formatWidth
    )
    setLayout(results)
  }, [rectLength, rectWidth, formatLength, formatWidth])

  return layout
}
