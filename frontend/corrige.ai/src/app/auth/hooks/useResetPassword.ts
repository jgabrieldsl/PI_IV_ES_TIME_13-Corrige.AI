import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthController } from '../controllers'

const resetPasswordSchema = z.object({
    email: z.string().email("E-mail inválido"),
})

type ResetPasswordCredentials = z.infer<typeof resetPasswordSchema>

export const useResetPassword = () => {
    const { resetPassword, loading, error, clearError } = useAuthController()

    const form = useForm<ResetPasswordCredentials>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const handleResetPassword = async (credentials: ResetPasswordCredentials) => {
        await resetPassword(credentials.email)
    }

    return {
        form,
        handleResetPassword: form.handleSubmit(handleResetPassword),
        resetPassword: handleResetPassword,
        loading,
        error,
        clearError,
    }
}
