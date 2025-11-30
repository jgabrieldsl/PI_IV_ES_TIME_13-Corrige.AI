import { create } from 'zustand'
import { AuthService } from '../services'
import type { LoginCredentials, SignupCredentials, AuthUser } from '../models'

interface IAuthController {
    user: AuthUser | null
    loading: boolean
    error: any | null
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
            } catch (error) {
                console.error("AuthController login error:", error)
                set({
                    error: error,
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
            } catch (error) {
                console.error("AuthController signup error:", error)
                set({
                    error: error,
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
            } catch (error) {
                set({
                    error: error,
                    loading: false
                })
            }
        },

        clearError: () => set({ error: null }),
    }
})
