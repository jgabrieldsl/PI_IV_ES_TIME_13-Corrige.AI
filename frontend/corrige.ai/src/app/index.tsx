import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/contexts/auth-context'
import { Router } from './router'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App