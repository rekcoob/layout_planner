// import React, { useContext, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

export const MyComponent = () => {
  const { rectLength } = useAppContext()

  console.log('Component rendered!')

  return <div>Rectangle Length: {rectLength}</div>
}
