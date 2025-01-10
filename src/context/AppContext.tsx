import React, { createContext, useContext, useState, ReactNode } from 'react'

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
  const [rectLength, setRectLength] = useState<number>(200)
  const [rectWidth, setRectWidth] = useState<number>(100)
  const [formatLength, setFormatLength] = useState<number>(1995)
  const [formatWidth, setFormatWidth] = useState<number>(1000)

  return (
    <AppContext.Provider
      value={{
        rectLength,
        rectWidth,
        formatLength,
        formatWidth,
        setRectLength,
        setRectWidth,
        setFormatLength,
        setFormatWidth,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppState => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
