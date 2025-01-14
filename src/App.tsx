import './App.css'
import InputForm from './components/InputForm'
import LayoutResults from './components/LayoutResults'
import DownloadDXFButton from './components/DownloadDXFButton'
import { AppProvider } from './context/AppContext'
// import Visual from './components/Visual'

function App() {
  return (
    <AppProvider>
      <>
        <h1 style={{ margin: '30px' }}>📐 Layout Planner </h1>
        <InputForm />
        <LayoutResults />
        <DownloadDXFButton />
        {/* <Visual /> */}
      </>
    </AppProvider>
  )
}

export default App
