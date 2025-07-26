
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { router } from './router'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="zivildienst-ui-theme">
      <div className="min-h-screen bg-background">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  )
}

export default App
