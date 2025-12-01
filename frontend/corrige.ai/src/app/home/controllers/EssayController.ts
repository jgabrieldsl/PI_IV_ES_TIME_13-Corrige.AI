import { create } from 'zustand'
import { EssayService } from '../services/EssayService'
import type { Essay, ICreateEssayRequest } from '../models'

// Interface do controlador de redações
interface IEssayController {
    essays: Essay[]
    currentEssay: Essay | null
    loading: boolean
    error: unknown | null
    loadUserEssays: (userId: string) => Promise<void>
    uploadEssay: (data: ICreateEssayRequest) => Promise<Essay>
    selectEssay: (essay: Essay) => void
    clearError: () => void
    reset: () => void
}

// Controlador Zustand para gerenciar estado das redações
export const useEssayController = create<IEssayController>()((set, get) => {
    return {
        essays: [],
        currentEssay: null,
        loading: false,
        error: null,

        // Carrega todas as redações do usuário
        loadUserEssays: async (userId: string) => {
            set({ loading: true, error: null })
            try {
                const essays = await EssayService.getUserEssays(userId)
                set({ essays, loading: false })
            } catch (error) {
                set({
                    error: error,
                    loading: false
                })
                throw error
            }
        },

        // Envia uma nova redação para correção
        uploadEssay: async (data: ICreateEssayRequest) => {
            set({ loading: true, error: null })
            try {
                const essay = await EssayService.uploadEssay(data)

                // Atualiza o cache com a nova redação
                const { essays } = get()
                const updatedEssays = [essay, ...essays].sort(
                    (a, b) => b.date.getTime() - a.date.getTime()
                )

                set({
                    essays: updatedEssays,
                    currentEssay: essay,
                    loading: false
                })

                return essay
            } catch (error) {
                set({
                    error: error,
                    loading: false
                })
                throw error
            }
        },

        // Seleciona uma redação para visualização
        selectEssay: (essay: Essay) => {
            set({ currentEssay: essay })
        },

        // Limpa erros
        clearError: () => set({ error: null }),

        // Reseta todo o estado
        reset: () => set({
            essays: [],
            currentEssay: null,
            loading: false,
            error: null
        }),
    }
})
