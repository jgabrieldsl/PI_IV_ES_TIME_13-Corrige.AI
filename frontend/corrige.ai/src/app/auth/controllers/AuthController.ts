import { create } from 'zustand'
import { AuthService } from '../services'
import type { LoginCredentials, RegisterCredentials, AuthUser } from '../models'

interface IAuthController {
    user: AuthUser | null
    loading: boolean
    error: any | null
    login: (credentials: LoginCredentials) => Promise<void>
    register: (credentials: RegisterCredentials) => Promise<void>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
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
                set({
                    error: error,
                    loading: false
                })
                throw error
            }
        },

        register: async (credentials: RegisterCredentials) => {
            set({ loading: true, error: null })
            try {
                const user = await authService.register(credentials)
                set({ user, loading: false })
            } catch (error) {
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

        resetPassword: async (email: string) => {
            set({ loading: true, error: null })
            try {
                await authService.resetPassword(email)
                set({ loading: false })
            } catch (error) {
                set({
                    error: error,
                    loading: false
                })
                throw error
            }
        },

        clearError: () => set({ error: null }),
    }
})
