import './App.css'
import InputForm from './components/InputForm'
import Results from './components/Results'
import DownloadDxfButton from './components/DownloadDxfButton'
// import DownloadDXFButton2 from './components/DownloadDXFButton2'
import { AppProvider } from './context/AppContext'
import { MyComponent } from './components/MyComponent'
import PreviewDxfButtons from './components/PreviewDxfButtons'
// import Visual from './components/Visual'

function App() {
  return (
    <AppProvider>
      <>
        <h1 style={{ margin: '30px' }}>📐 Layout Planner </h1>
        <InputForm />
        <Results />
        <PreviewDxfButtons />
        <DownloadDxfButton />
        {/* <MyComponent /> */}
        {/* <Visual /> */}
      </>
    </AppProvider>
  )
}

export default App
