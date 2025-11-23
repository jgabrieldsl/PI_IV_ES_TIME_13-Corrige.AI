import { create } from 'zustand'
import { AuthService } from '../services'
import type { LoginCredentials, SignupCredentials, AuthUser } from '../models'

interface IAuthController {
    user: AuthUser | null
    loading: boolean
    error: string | null
    login: (credentials: LoginCredentials) => Promise<void>
    signup: (credentials: SignupCredentials) => Promise<void>
    logout: () => Promise<void>
    clearError: () => void
}

export const useAuthController = create<IAuthController>()((set) => {
    const authService = new AuthService()

    return {
        user: null,
        loading: false,
        error: null,

        login: async (credentials: LoginCredentials) => {
            set({ loading: true, error: null })
            try {
                const user = await authService.login(credentials)
                set({ user, loading: false })
            } catch (error: any) {
                set({
                    error: "Falha ao fazer login. Verifique suas credenciais.",
                    loading: false
                })
                throw error
            }
        },

        signup: async (credentials: SignupCredentials) => {
            set({ loading: true, error: null })
            try {
                const user = await authService.signup(credentials)
                set({ user, loading: false })
            } catch (error: any) {
                set({
                    error: "Falha ao criar conta. Tente novamente.",
                    loading: false
                })
                throw error
            }
        },

        logout: async () => {
            set({ loading: true, error: null })
            try {
                await authService.logout()
                set({ user: null, loading: false })
            } catch (error: any) {
                set({
                    error: "Falha ao sair.",
                    loading: false
                })
            }
        },

        clearError: () => set({ error: null }),
    }
})
