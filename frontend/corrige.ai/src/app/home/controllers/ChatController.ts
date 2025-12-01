import { create } from 'zustand'
import type { ChatMessage } from '../models'
import { ChatService } from '../services'
import { ApiService } from '@/shared/api'



interface IChatController {
  messages: ChatMessage[]
  eventSource: EventSource | null
  isConnected: boolean
  currentUserId: string
  currentUserType: 'STUDENT' | 'TEACHER'
  setCurrentUserId: (userId: string) => void
  setCurrentUserType: (userType: 'STUDENT' | 'TEACHER') => void
  connectToChat: (socketId: string) => void
  sendMessage: (socketId: string, mensagem: string, email?: string) => Promise<void>
  disconnectFromChat: () => void
}

export const useChatController = create<IChatController>()((set, get) => {
  const api = new ApiService()
  const chatService = new ChatService(api)

  return {
    messages: [],
    eventSource: null,
    isConnected: false,
    currentUserId: '',
    currentUserType: 'STUDENT',

    setCurrentUserId: (userId: string) => {
      set({ currentUserId: userId })
    },

    setCurrentUserType: (userType: 'STUDENT' | 'TEACHER') => {
      set({ currentUserType: userType })
    },

    connectToChat: (socketId: string) => {
      console.log('[ChatController] Connecting to chat with socketId:', socketId)
      const { eventSource } = get()

      // Fecha conexão anterior se existir
      if (eventSource) {
        eventSource.close()
      }

      // Conecta ao stream SSE
      const newEventSource = chatService.connectToMessageStream(socketId, (message) => {
        const { currentUserId } = get()

        // Só adiciona se não for uma mensagem do próprio usuário
        // (evita duplicação já que mensagens próprias são adicionadas localmente)
        console.log('[ChatController] Message received:', message)

        const { messages } = get()
        const lastMessage = messages[messages.length - 1]

        // Duplicacao tratamento
        if (lastMessage &&
          lastMessage.timestamp === message.timestamp &&
          lastMessage.userId === message.userId &&
          lastMessage.mensagem === message.mensagem) {
          console.log('[ChatController] Duplicate message detected. Ignoring.')
          return
        }

        if (String(message.userId) !== String(currentUserId)) {
          console.log('[ChatController] Adding message to state (not from self)')
          set((state) => ({
            messages: [...state.messages, message]
          }))
        } else {
          console.log('[ChatController] Ignoring message (from self)')
        }
      })

      set({
        eventSource: newEventSource,
        isConnected: true
      })
    },

    sendMessage: async (socketId: string, mensagem: string, email?: string) => {
      const { currentUserId, currentUserType } = get()

      // Adiciona a mensagem localmente primeiro
      const localMessage: ChatMessage = {
        userId: currentUserId,
        userType: currentUserType,
        mensagem: mensagem,
        timestamp: Date.now(),
        email: email
      }

      set((state) => ({
        messages: [...state.messages, localMessage]
      }))

      // Envia para o servidor
      await chatService.sendMessage({ socketId, mensagem })
    },

    disconnectFromChat: () => {
      const { eventSource } = get()

      if (eventSource) {
        eventSource.close()
      }

      set({
        eventSource: null,
        isConnected: false,
        messages: [],
        currentUserId: ''
      })
    }
  }
})
