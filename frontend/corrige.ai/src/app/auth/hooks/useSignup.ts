import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthController } from '../controllers'
import { signupSchema, type SignupCredentials } from '../models/AuthModel'

export const useSignup = () => {
    const navigate = useNavigate()
    const { signup, loading, error, clearError } = useAuthController()

    const form = useForm<SignupCredentials>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: false,
        },
    })

    const handleSignup = async (credentials: SignupCredentials) => {
        try {
            await signup(credentials)
            navigate('/')
        } catch (error) {
            // Error is handled by AuthController state
            console.error("Signup failed:", error)
        }
    }

    return {
        form,
        handleSignup: form.handleSubmit(handleSignup),
        loading,
        error,
        clearError,
    }
}
