import { useState, useEffect, useRef } from "react"
import { X, Send, GraduationCap, MessageSquare, UserCog } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { useConnectionController } from "@/app/home/controllers/ConnectionController"
import { useChatController } from "@/app/home/controllers/ChatController"
import { useAuth } from "@/app/auth/contexts/auth-context"
import { Loader2 } from "lucide-react"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"

interface ProfessorChatProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfessorChat({ isOpen, onClose }: ProfessorChatProps) {
  const [input, setInput] = useState("")
  const [isTeacherMode, setIsTeacherMode] = useState(false)
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    isConnecting,
    connection,
    setConnection,
    disconnect
  } = useConnectionController()

  const {
    messages,
    connectToChat,
    sendMessage,
    isConnected: isChatConnected,
    setCurrentUserId,
    setCurrentUserType,
    disconnectFromChat
  } = useChatController()

  const isConnected = isChatConnected && connection?.dados?.socketId

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isConnected) {
        disconnectFromChat()
        disconnect()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isConnected, disconnectFromChat, disconnect])

  const handleConnect = async () => {
    if (!user) return

    const userType = isTeacherMode ? 'TEACHER' : 'STUDENT'

    try {
      const authToken = await user.getIdToken()

      setCurrentUserId(user.uid)
      setCurrentUserType(userType)

      await setConnection({
        tipo: 'CONNECT',
        dados: {
          userId: user.uid,
          userType: userType,
          authToken: authToken
        }
      })
    } catch (error) {
      console.error('[ProfessorChat] Failed to get auth token:', error)
    }
  }

  useEffect(() => {
    if (connection?.dados?.socketId && !isChatConnected) {
      connectToChat(connection.dados.socketId)
    }
  }, [connection, isChatConnected, connectToChat])

  const handleDisconnect = async () => {
    disconnectFromChat()
    await disconnect()
  }

  const handleSend = async () => {
    if (!input.trim() || !connection?.dados?.socketId) return

    const messageText = input
    setInput("")

    await sendMessage(connection.dados.socketId, messageText, user?.email || undefined)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-sidebar border-l border-sidebar-border flex flex-col z-50 animate-in slide-in-from-right duration-300 shadow-2xl">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTeacherMode ? 'bg-purple-500/10' : 'bg-primary/10'}`}>
              {isTeacherMode ? (
                <GraduationCap className="w-5 h-5 text-purple-500" />
              ) : (
                <MessageSquare className="w-5 h-5 text-primary" />
              )}
            </div>
            {isConnected && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-sidebar" />
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">
              {isTeacherMode ? "Sala dos Professores" : "Bate papo"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isConnected ? "Conectado" : "Desconectado"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isConnected && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="rounded-lg hover:bg-sidebar-accent text-xs"
            >
              Desconectar
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg hover:bg-sidebar-accent">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isTeacherMode ? 'bg-purple-500/10' : 'bg-primary/10'}`}>
            {isTeacherMode ? (
              <UserCog className="w-8 h-8 text-purple-500" />
            ) : (
              <MessageSquare className="w-8 h-8 text-primary" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {isTeacherMode ? "Modo Professor" : "Converse com um Professor"}
          </h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-[250px]">
            {isTeacherMode
              ? "Conecte-se para atender dúvidas dos alunos."
              : "Tire suas dúvidas sobre a correção da sua redação em tempo real."
            }
          </p>

          <div className="flex items-center space-x-2 mb-8 bg-secondary/50 p-3 rounded-lg">
            <Switch
              id="professor-mode"
              checked={isTeacherMode}
              onCheckedChange={setIsTeacherMode}
            />
            <Label htmlFor="professor-mode" className="text-sm cursor-pointer">Modo Professor</Label>
          </div>

          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`w-full max-w-[200px] rounded-xl ${isTeacherMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-primary hover:bg-primary/90'}`}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Conectando...
              </>
            ) : (
              isTeacherMode ? "Entrar como Professor" : "Entrar no chat"
            )}
          </Button>
        </div>
      ) : (
        <>
          <div className={`p-3 mx-4 mt-4 rounded-xl glass-subtle ${isTeacherMode ? 'border-purple-500/20' : 'gradient-ai-border'}`}>
            <p className="text-xs text-foreground text-center">
              {isTeacherMode
                ? "Você está conectado como Professor."
                : "Você está conectado. Envie sua dúvida!"
              }
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isUser = message.userId === user?.uid
              return (
                <div key={index} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                  {!isUser && (
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className={`text-foreground text-sm ${message.userType === 'TEACHER' ? 'bg-purple-500/20 text-purple-500' : 'bg-secondary'}`}>
                        {message.userType === 'TEACHER' ? <GraduationCap className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col max-w-[80%]">
                    {message.email && !isUser && (
                      <span className="text-[10px] text-muted-foreground mb-1 ml-1">
                        {message.email} {message.userType === 'TEACHER' && '(Professor)'}
                      </span>
                    )}
                    <div
                      className={`rounded-xl p-3 ${isUser
                        ? (isTeacherMode ? "bg-purple-600 text-white" : "gradient-ai text-white")
                        : "glass-subtle"
                        }`}
                    >
                      <p className="text-sm leading-relaxed">{message.mensagem}</p>
                      <p className={`text-[10px] mt-1 ${isUser ? "text-white/70" : "text-muted-foreground"}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-sidebar-border bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
            <div className="glass rounded-xl p-3 flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`rounded-lg w-9 h-9 p-0 hover:opacity-90 disabled:opacity-50 border-0 ${isTeacherMode ? 'bg-purple-600' : 'gradient-ai'}`}
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
