import './App.css'
import InputForm from './components/InputForm'
import Results from './components/Results'
import DownloadDxfButton from './components/DownloadDxfButton'
import { AppProvider } from './context/AppContext'
// import { MyComponent } from './components/MyComponent'
import PreviewDxfButtons from './components/PreviewDxfButtons'
import StateChanger from './components/StateChanger'
// import Visual from './components/Visual'

function App() {
  return (
    <AppProvider>
      <div className='container'>
        <StateChanger />
        <h1 style={{ margin: '30px' }}>📐 Layout Planner </h1>
        <InputForm />
        <Results />
        <DownloadDxfButton />
        <PreviewDxfButtons />
      </div>
    </AppProvider>
  )
}

export default App
