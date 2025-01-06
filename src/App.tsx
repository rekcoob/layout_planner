import './App.css'

// import Vypocet from './components/Vypocet'
import InputComponent from './components/InputComponent'
import CalculationComponent from './components/CalculationComponent'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <>
        <h1>Layout Planner</h1>

        <InputComponent />
        <CalculationComponent />
        {/* <Vypocet /> */}
      </>
    </AppProvider>
  )
}

export default App
