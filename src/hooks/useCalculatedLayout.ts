import { useState, useEffect } from 'react'
import { calculateLayout, CalculationResults } from '../services/calculations'

export const useCalculatedLayout = (
  rectLength: number,
  rectWidth: number,
  formatLength: number,
  formatWidth: number
): CalculationResults => {
  const [layout, setLayout] = useState<CalculationResults>({
    cols1: 0,
    rows1: 0,
    total1: 0,
    adjustedTotal1: 0,
    remainder1: 0,

    cols2: 0,
    rows2: 0,
    total2: 0,
    remainder2: 0,

    totalRectangles: 0,
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
