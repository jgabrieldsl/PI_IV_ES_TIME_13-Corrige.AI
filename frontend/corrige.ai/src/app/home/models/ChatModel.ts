export interface ChatMessage {
  userId: string
  userType: string
  mensagem: string
  timestamp: number
  email?: string
}

export interface SendMessageRequest {
  socketId: string
  mensagem: string
}
