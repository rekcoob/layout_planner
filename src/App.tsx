import './App.css'
import styles from './App.module.css'
import { AppProvider } from './context/AppContext'
import InputForm from './components/InputForm'
import Results from './components/Results'
import DownloadDxfButton from './components/DownloadDxfButton'
import PreviewDxfButtons from './components/PreviewDxfButtons'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <AppProvider>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>📐 Layout Planner</h1>
          <div className={styles.toggleWrapper}>
            <ThemeToggle theme={theme} onToggle={toggle} />
          </div>
        </div>
        <InputForm />
        <Results />
        <DownloadDxfButton />
        <PreviewDxfButtons />
      </div>
    </AppProvider>
  )
}

export default App
