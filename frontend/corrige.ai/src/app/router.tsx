import { Route, Routes } from 'react-router-dom'

import NotFoundView from './not-found'
import LoginPage from './auth/login/view'
import SignupPage from './auth/signup/view'

import Home from './home'


import { ProtectedRoute } from '@/shared/components/auth/protected-route'

const ROUTES = {
  not_found: '/*',
  login: '/auth/login',
  signup: '/auth/signup',
}

export function Router() {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.login}
        element={<LoginPage />}
      />
      <Route
        path={ROUTES.signup}
        element={<SignupPage />}
      />
      <Route
        path={ROUTES.not_found}
        element={<NotFoundView />}
      />
    </Routes>
  )
}