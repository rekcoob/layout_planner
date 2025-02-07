// context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
// import { Rectangle, LayoutDimensions } from '../types'

interface AppState {
  rectLength: number
  rectWidth: number
  formatLength: number
  formatWidth: number
  setRectLength: (value: number) => void
  setRectWidth: (value: number) => void
  setFormatLength: (value: number) => void
  setFormatWidth: (value: number) => void
}

const AppContext = createContext<AppState | null>(null)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Rectangle dimensions
  const [rectLength, setRectLength] = useState<number>(240)
  const [rectWidth, setRectWidth] = useState<number>(100)
  // Format dimensions
  const [formatLength, setFormatLength] = useState<number>(2020)
  const [formatWidth, setFormatWidth] = useState<number>(1000)

  // rec 240x100 form 1995 1000 => lengthwise better option
  // rec 240x100 form 2020 1000 => lengthwise w remainder
  // rec 20x9 form 210 100 => lengthwise w remainder w bigger shared Line

  // rec 240x100 form 1995x880 => crosswise better option
  // rec 240x100 form 1995x740 => crosswise no remainder

  const value: AppState = {
    rectLength,
    rectWidth,
    formatLength,
    formatWidth,
    setRectLength,
    setRectWidth,
    setFormatLength,
    setFormatWidth,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppState => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
