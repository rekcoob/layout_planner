import './App.css'
import InputComponent from './components/InputComponent'
import Results from './components/Results'
// import Visual from './components/Visual'
import DownloadDxf from './components/DownloadDxf'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <>
        <h1>Layout Planner</h1>
        <InputComponent />
        <Results />
        <DownloadDxf />
        {/* <Visual /> */}
      </>
    </AppProvider>
  )
}

export default App
