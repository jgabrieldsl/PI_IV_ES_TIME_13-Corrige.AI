import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthController } from '../controllers'
import { registerSchema, type RegisterCredentials } from '../models/AuthModel'

export const useRegister = () => {
    const navigate = useNavigate()
    const { register, loading, error, clearError } = useAuthController()

    const form = useForm<RegisterCredentials>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            terms: false,
        },
    })

    const handleRegister = async (credentials: RegisterCredentials) => {
        await register(credentials)
        navigate('/')
    }

    return {
        form,
        handleRegister: form.handleSubmit(handleRegister),
        loading,
        error,
        clearError,
    }
}
