"use client"

import { PenLine, BarChart3, MessageCircle, BookOpen, Plus, Lock } from "lucide-react"

interface FeatureCardsProps {
  hasCorrection: boolean
  onOpenChat: () => void
}

export function FeatureCards({ hasCorrection, onOpenChat }: FeatureCardsProps) {
  const features = [
    {
      icon: PenLine,
      title: "Correcao por IA",
      description: "Analise detalhada das 5 competencias.",
      color: "text-foreground",
      bgColor: "bg-secondary",
    },
    {
      icon: BarChart3,
      title: "Evolucao",
      description: "Acompanhe seu progresso.",
      color: "text-foreground",
      bgColor: "bg-secondary",
    },
    {
      icon: MessageCircle,
      title: "Falar com Professor",
      description: hasCorrection ? "Tire duvidas em tempo real." : "Disponivel apos correcao.",
      color: hasCorrection ? "text-foreground" : "text-muted-foreground",
      bgColor: hasCorrection ? "bg-secondary" : "bg-muted/50",
      isChat: true,
      disabled: !hasCorrection,
    },
    {
      icon: BookOpen,
      title: "Banco de Temas",
      description: "Temas atualizados ENEM.",
      color: "text-foreground",
      bgColor: "bg-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      {features.map((feature, index) => {
        const Icon = feature.icon
        const isDisabled = feature.disabled

        return (
          <button
            key={index}
            onClick={feature.isChat && !isDisabled ? onOpenChat : undefined}
            disabled={isDisabled}
            className={`glass-subtle rounded-xl p-4 text-left transition-all duration-200 group relative overflow-hidden ${
              isDisabled ? "opacity-60 cursor-not-allowed" : "hover:bg-secondary/60"
            }`}
          >
            {feature.isChat && isDisabled && (
              <div className="absolute top-3 right-3">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${feature.color}`} />
                </div>
              </div>
              {!isDisabled && (
                <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
            <h3 className="font-medium text-foreground mb-1 text-sm">{feature.title}</h3>
            <p className={`text-xs ${isDisabled ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
              {feature.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
