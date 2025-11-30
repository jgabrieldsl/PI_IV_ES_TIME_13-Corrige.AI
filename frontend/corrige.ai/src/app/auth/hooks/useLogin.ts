import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthController } from '../controllers'
import { loginSchema, type LoginCredentials } from '../models/AuthModel'

export const useLogin = () => {
    const navigate = useNavigate()
    const { login, loading, error, clearError } = useAuthController()

    const form = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleLogin = async (credentials: LoginCredentials) => {
        try {
            await login(credentials)
            navigate('/')
        } catch (error) {
            // Error is handled by AuthController state
            console.error("Login failed:", error)
        }
    }

    return {
        form,
        handleLogin: form.handleSubmit(handleLogin),
        loading,
        error,
        clearError,
    }
}
