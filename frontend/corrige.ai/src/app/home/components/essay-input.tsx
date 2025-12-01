import { useState } from "react"
import { Paperclip, Mic, Sparkles, Send, ChevronDown } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { useToast } from "@/shared/hooks/use-toast"
import type { User } from "firebase/auth"

import { type ICreateEssay } from "@/app/home/services/EssayService"
import { ESSAY_THEMES } from "@/shared/lib/constants"

interface EssayInputProps {
  user: User | null
  onSubmit: (data: ICreateEssay) => void
}

export function EssayInput({ user, onSubmit }: EssayInputProps) {
  const [value, setValue] = useState("")
  const [theme, setTheme] = useState("")
  const [customTheme, setCustomTheme] = useState("")
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const { toast } = useToast()

  const selectedTheme = ESSAY_THEMES.find((t) => t.value === theme)

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para enviar uma redação.",
        variant: "destructive",
      })
      return
    }

    const themeLabel = theme === "outros" ? customTheme : selectedTheme?.label || theme

    onSubmit({
      title: themeLabel,
      text: value,
      theme: themeLabel,
      userId: user.uid,
    })

    setValue("")
    setTheme("")
    setCustomTheme("")
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="w-full glass rounded-xl px-4 py-3 text-left flex items-center justify-between hover:bg-secondary/40 transition-colors cursor-pointer"
          >
            <span className={selectedTheme?.value ? "text-foreground" : "text-muted-foreground"}>
              {selectedTheme?.label || "Selecione um tema"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${isThemeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isThemeOpen && (
            <div className="absolute z-50 w-full mt-2 glass rounded-xl overflow-hidden shadow-lg max-h-64 overflow-y-auto">
              {ESSAY_THEMES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setTheme(item.value)
                    setIsThemeOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-secondary/60 transition-colors cursor-pointer ${theme === item.value ? "bg-secondary text-foreground" : "text-foreground"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {theme === "outros" && (
          <input
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Digite o tema da redação..."
            className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
          />
        )}
      </div>

      <div className="glass rounded-xl p-4">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cole ou digite sua redação aqui para correção..."
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[120px] text-base leading-relaxed"
        />
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg h-9 px-4 bg-muted/50 text-muted-foreground cursor-not-allowed hover:bg-muted/50"
                  onClick={(e) => e.preventDefault()}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Anexar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Funcionalidade indisponível no momento</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg h-9 px-4 bg-muted/50 text-muted-foreground cursor-not-allowed hover:bg-muted/50"
                  onClick={(e) => e.preventDefault()}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Gravar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Funcionalidade indisponível no momento</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg h-9 px-4 bg-muted/50 text-muted-foreground cursor-not-allowed hover:bg-muted/50"
                  onClick={(e) => e.preventDefault()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Tema
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Funcionalidade indisponível no momento</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={value.trim().length < 100 || !theme || (theme === "outros" && !customTheme.trim())}
            className="rounded-lg w-10 h-10 p-0 gradient-ai hover:opacity-90 disabled:opacity-50 border-0"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        A IA pode gerar correções que variam em precisão. Revise sempre o feedback.
      </p>
    </div>
  )
}
