import './App.css'
import { AppProvider } from './context/AppContext'
import InputForm from './components/InputForm'
import Results from './components/Results'
import DownloadDxfButton from './components/DownloadDxfButton'
import PreviewDxfButtons from './components/PreviewDxfButtons'
// import StateChanger from './components/StateChanger'

function App() {
  return (
    <AppProvider>
      <div className='container'>
        {/* <StateChanger /> */}
        <h1 style={{ margin: '30px', fontSize: '48px' }}>📐 Layout Planner </h1>
        <InputForm />
        <Results />
        <DownloadDxfButton />
        <PreviewDxfButtons />
      </div>
    </AppProvider>
  )
}

export default App
