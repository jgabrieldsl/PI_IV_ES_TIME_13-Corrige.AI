import { ArrowLeft, MessageCircle, TrendingUp, Award, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Progress } from "@/shared/components/ui/progress"
import { EvolutionChart } from "./evolution-chart"
import type { CorrectionResult } from "@/shared/lib/types"

interface CorrectionPanelProps {
  essayText: string
  correctionData: CorrectionResult
  onBack: () => void
  onOpenChat: () => void
}

export function CorrectionPanel({ essayText, correctionData, onBack, onOpenChat }: CorrectionPanelProps) {
  const { totalScore, competencies, generalFeedback, strengths, improvements } = correctionData

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="rounded-lg hover:bg-secondary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nova Redacao
        </Button>
        <Button onClick={onOpenChat} className="rounded-lg gradient-ai hover:opacity-90 text-white border-0">
          <MessageCircle className="w-4 h-4 mr-2" />
          Falar com Professor
        </Button>
      </div>

      {/* Total Score Card - reduced rounding */}
      <div className="glass rounded-xl p-5 gradient-ai-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg gradient-ai flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Nota Final</h2>
              <p className="text-sm text-muted-foreground">Baseada nas 5 competencias do ENEM</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-foreground">{totalScore}</p>
            <p className="text-sm text-muted-foreground">de 1000</p>
          </div>
        </div>
        <Progress value={(totalScore / 1000) * 100} className="h-2 rounded-full" />
      </div>

      {/* General Feedback */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Feedback Geral</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">{generalFeedback}</p>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Pontos Fortes</h3>
          </div>
          <ul className="space-y-2">
            {strengths.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Pontos a Melhorar</h3>
          </div>
          <ul className="space-y-2">
            {improvements.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Competency Scores */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Competencias ENEM</h3>
        <div className="space-y-4">
          {competencies.map((comp) => (
            <div key={comp.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    C{comp.id}: {comp.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{comp.description}</p>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {comp.score}/{comp.maxScore}
                </span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-foreground/60 transition-all duration-500"
                  style={{ width: `${(comp.score / comp.maxScore) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground italic">{comp.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Evolution Chart */}
        <EvolutionChart />

        {/* Essay Preview */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Sua Redacao</h3>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 max-h-64 overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{essayText}</p>
          </div>
        </div>
      </div>

      {/* CTA to chat */}
      <div className="glass rounded-xl p-5 text-center gradient-ai-border">
        <h3 className="font-semibold text-foreground mb-2">Tem duvidas sobre sua correcao?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Converse com um professor para entender melhor o feedback e como melhorar.
        </p>
        <Button onClick={onOpenChat} className="rounded-lg gradient-ai hover:opacity-90 text-white border-0">
          <MessageCircle className="w-4 h-4 mr-2" />
          Iniciar Conversa com Professor
        </Button>
      </div>
    </div>
  )
}
