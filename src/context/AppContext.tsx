// context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface IAppState {
  rectLength: number
  rectWidth: number
  formatLength: number
  formatWidth: number
  setRectLength: (value: number) => void
  setRectWidth: (value: number) => void
  setFormatLength: (value: number) => void
  setFormatWidth: (value: number) => void
}

const AppContext = createContext<IAppState | null>(null)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Rectangle dimensions
  const [rectLength, setRectLength] = useState<number>(200)
  const [rectWidth, setRectWidth] = useState<number>(100)
  // Format dimensions
  const [formatLength, setFormatLength] = useState<number>(2000)
  const [formatWidth, setFormatWidth] = useState<number>(1000)

  const value: IAppState = {
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

export const useAppContext = (): IAppState => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
