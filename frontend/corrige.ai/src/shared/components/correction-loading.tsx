import { useEffect, useState } from "react"
import { Brain, FileText, BarChart3, CheckCircle2, Sparkles } from "lucide-react"

const steps = [
  { icon: FileText, text: "Analisando estrutura do texto...", duration: 800 },
  { icon: Brain, text: "Processando com IA...", duration: 1000 },
  { icon: BarChart3, text: "Calculando notas por competencia...", duration: 700 },
  { icon: CheckCircle2, text: "Gerando feedback detalhado...", duration: 500 },
]

export function CorrectionLoading() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let elapsed = 0

    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index)
      }, elapsed)
      timers.push(timer)
      elapsed += step.duration
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="relative">
        <div className="w-20 h-20 rounded-xl gradient-ai flex items-center justify-center animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-xl border-2 border-border animate-ping" />
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Corrigindo sua redacao</h2>
        <p className="text-muted-foreground">Aguarde enquanto nossa IA analisa seu texto</p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === currentStep
          const isComplete = index < currentStep

          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isActive ? "glass gradient-ai-border" : isComplete ? "opacity-60" : "opacity-30"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive
                  ? "gradient-ai"
                  : isComplete
                    ? "bg-secondary text-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""} ${isActive ? "animate-pulse" : ""}`} />
                )}
              </div>
              <span className={`text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {step.text}
              </span>
              {isActive && (
                <div className="ml-auto flex gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
