import type { SendMessageRequest, ChatMessage } from '../models'
import type { ApiService } from '@/shared/api'

export class ChatService {
  private apiService: ApiService

  constructor(apiService: ApiService) {
    this.apiService = apiService
  }

  async sendMessage(request: SendMessageRequest): Promise<void> {
    await this.apiService.post('/api/chat/send', request)
  }

  // Conecta ao stream SSE de mensagens
  connectToMessageStream(socketId: string, onMessage: (message: ChatMessage) => void): EventSource {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const eventSource = new EventSource(`${baseUrl}/api/chat/stream/${socketId}`)

    eventSource.addEventListener('chat-message', (event) => {
      const message: ChatMessage = JSON.parse(event.data)
      onMessage(message)
    })

    eventSource.onerror = (error) => {
      console.error('Erro no stream SSE:', error)
    }

    return eventSource
  }
}
