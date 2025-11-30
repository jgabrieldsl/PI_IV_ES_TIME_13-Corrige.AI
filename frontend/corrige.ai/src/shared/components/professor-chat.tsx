import { useState } from "react"
import { X, Send, GraduationCap } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"

interface ProfessorChatProps {
  isOpen: boolean
  onClose: () => void
}

const initialMessages = [
  {
    id: 1,
    role: "professor",
    content:
      "Ola! Sou o Prof. Carlos, especialista em redacoes ENEM. Vi sua correcao e estou aqui para ajudar. O que gostaria de entender melhor?",
    timestamp: "Agora",
  },
]

export function ProfessorChat({ isOpen, onClose }: ProfessorChatProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        role: "user",
        content: input,
        timestamp: "Agora",
      },
    ])
    setInput("")

    // Simulate professor response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "professor",
          content:
            "Excelente pergunta! Vou te explicar de forma detalhada. Na competencia que voce mencionou, o importante e demonstrar dominio completo dos elementos exigidos pelo ENEM. Quer que eu de exemplos praticos?",
          timestamp: "Agora",
        },
      ])
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-sidebar border-l border-sidebar-border flex flex-col z-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-border">
              <AvatarImage src="/professor-male-teacher.jpg" />
              <AvatarFallback className="bg-secondary text-foreground">PC</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-foreground/60 rounded-full border-2 border-sidebar" />
          </div>
          <div>
            <p className="font-medium text-foreground">Prof. Carlos</p>
            <p className="text-xs text-muted-foreground">Especialista ENEM • Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg hover:bg-sidebar-accent">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-3 mx-4 mt-4 rounded-xl glass-subtle gradient-ai-border">
        <p className="text-xs text-foreground text-center">Tire suas duvidas sobre a correcao da sua redacao</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
            {message.role === "professor" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src="/professor-male-teacher.jpg" />
                <AvatarFallback className="bg-secondary text-foreground text-sm">
                  <GraduationCap className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-xl p-3 ${message.role === "user" ? "gradient-ai text-white" : "glass-subtle"
                }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-[10px] mt-1 ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua duvida..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-lg w-9 h-9 p-0 gradient-ai hover:opacity-90 disabled:opacity-50 border-0"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
