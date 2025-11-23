import { useNavigate } from 'react-router-dom'
import { useAuthController } from '../controllers'
import type { SignupCredentials } from '../models'

export const useSignup = () => {
    const navigate = useNavigate()
    const { signup, loading, error, clearError } = useAuthController()

    const handleSignup = async (credentials: SignupCredentials) => {
        await signup(credentials)
        navigate('/')
    }

    return {
        handleSignup,
        loading,
        error,
        clearError,
    }
}
