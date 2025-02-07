import './App.css'
import InputForm from './components/InputForm'
import LayoutResults from './components/LayoutResults'
import DownloadDXFButton from './components/DownloadDXFButton'
// import DownloadDXFButton2 from './components/DownloadDXFButton2'
import { AppProvider } from './context/AppContext'
import { MyComponent } from './components/MyComponent'
import PreviewDXFButton from './components/PreviewDXFButton'
// import Visual from './components/Visual'

function App() {
  return (
    <AppProvider>
      <>
        <MyComponent />
        <h1 style={{ margin: '30px' }}>📐 Layout Planner </h1>
        <InputForm />
        <LayoutResults />
        <DownloadDXFButton />
        <PreviewDXFButton />
        {/* <DownloadDXFButton2 /> */}
        {/* <Visual /> */}
      </>
    </AppProvider>
  )
}

export default App
