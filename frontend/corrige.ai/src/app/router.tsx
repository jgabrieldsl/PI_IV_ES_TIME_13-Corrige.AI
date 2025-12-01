import { Route, Routes } from 'react-router-dom'

import NotFoundView from './not-found'
import LoginPage from './auth/login/view'
import RegisterPage from './auth/register/view'
import ForgotPasswordPage from './auth/forgot-password/view'

import Home from './home'


import { ProtectedRoute } from '@/shared/components/auth/protected-route'

const ROUTES = {
  not_found: '/*',
  login: '/auth/login',
  register: '/auth/register',
  forgot_password: '/auth/forgot-password',
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
        path={ROUTES.register}
        element={<RegisterPage />}
      />
      <Route
        path={ROUTES.forgot_password}
        element={<ForgotPasswordPage />}
      />
      <Route
        path={ROUTES.not_found}
        element={<NotFoundView />}
      />
    </Routes>
  )
}