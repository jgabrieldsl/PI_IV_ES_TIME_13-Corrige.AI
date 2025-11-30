import { useState } from "react"
import { Paperclip, Mic, Sparkles, Send, ChevronDown } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

const ESSAY_THEMES = [
  { value: "", label: "Selecione um tema" },
  { value: "desafios-saude-mental-jovens", label: "Desafios da saude mental entre jovens brasileiros" },
  { value: "impactos-redes-sociais", label: "Impactos das redes sociais na sociedade" },
  { value: "democratizacao-acesso-educacao", label: "Democratizacao do acesso a educacao no Brasil" },
  { value: "mudancas-climaticas", label: "Mudancas climaticas e responsabilidade ambiental" },
  { value: "violencia-urbana", label: "Violencia urbana e seguranca publica" },
  { value: "fake-news-desinformacao", label: "Fake news e desinformacao na era digital" },
  { value: "mobilidade-urbana", label: "Mobilidade urbana nas grandes cidades" },
  { value: "inclusao-pessoas-deficiencia", label: "Inclusao de pessoas com deficiencia" },
  { value: "cultura-cancelamento", label: "Cultura do cancelamento e liberdade de expressao" },
  { value: "outros", label: "Outros (digite o tema)" },
]

interface EssayInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  theme: string
  onThemeChange: (theme: string) => void
  customTheme: string
  onCustomThemeChange: (theme: string) => void
}

export function EssayInput({
  value,
  onChange,
  onSubmit,
  theme,
  onThemeChange,
  customTheme,
  onCustomThemeChange,
}: EssayInputProps) {
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const selectedTheme = ESSAY_THEMES.find((t) => t.value === theme)

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="w-full glass rounded-xl px-4 py-3 text-left flex items-center justify-between hover:bg-secondary/40 transition-colors"
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
                    onThemeChange(item.value)
                    setIsThemeOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-secondary/60 transition-colors ${theme === item.value ? "bg-secondary text-foreground" : "text-foreground"
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
            onChange={(e) => onCustomThemeChange(e.target.value)}
            placeholder="Digite o tema da redacao..."
            className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
          />
        )}
      </div>

      <div className="glass rounded-xl p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cole ou digite sua redacao aqui para correcao..."
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[120px] text-base leading-relaxed"
        />
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="rounded-lg h-9 px-4 hover:bg-secondary text-muted-foreground">
              <Paperclip className="w-4 h-4 mr-2" />
              Anexar
            </Button>
            <Button variant="ghost" size="sm" className="rounded-lg h-9 px-4 hover:bg-secondary text-muted-foreground">
              <Mic className="w-4 h-4 mr-2" />
              Gravar
            </Button>
            <Button variant="ghost" size="sm" className="rounded-lg h-9 px-4 hover:bg-secondary text-muted-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Tema
            </Button>
          </div>
          <Button
            onClick={onSubmit}
            disabled={value.trim().length < 100 || !theme || (theme === "outros" && !customTheme.trim())}
            className="rounded-lg w-10 h-10 p-0 gradient-ai hover:opacity-90 disabled:opacity-50 border-0"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        A IA pode gerar correcoes que variam em precisao. Revise sempre o feedback.
      </p>
    </div>
  )
}
