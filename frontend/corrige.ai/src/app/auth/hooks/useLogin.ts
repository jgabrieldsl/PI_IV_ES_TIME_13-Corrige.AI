import { useNavigate } from 'react-router-dom'
import { useAuthController } from '../controllers'
import type { LoginCredentials } from '../models'

export const useLogin = () => {
    const navigate = useNavigate()
    const { login, loading, error, clearError } = useAuthController()

    const handleLogin = async (credentials: LoginCredentials) => {
        await login(credentials)
        navigate('/')
    }

    return {
        handleLogin,
        loading,
        error,
        clearError,
    }
}
