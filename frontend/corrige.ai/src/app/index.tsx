import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/contexts/auth-context'
import { Router } from './router'
import { ThemeProvider } from '@/shared/components/theme-provider'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App