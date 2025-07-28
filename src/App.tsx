
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { router } from './router'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="zivildienst-ui-theme">
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
