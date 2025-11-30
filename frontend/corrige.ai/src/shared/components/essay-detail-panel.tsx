"use client"

import {
  ArrowLeft,
  MessageCircle,
  Calendar,
  FileText,
  Award,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Progress } from "@/shared/components/ui/progress"
import { UserHeader } from "./user-header"
import type { Essay } from "@/shared/lib/types"

interface EssayDetailPanelProps {
  essay: Essay
  onBack: () => void
  onOpenChat: () => void
}

export function EssayDetailPanel({ essay, onBack, onOpenChat }: EssayDetailPanelProps) {
  const { correction } = essay

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-emerald-400"
    if (score >= 600) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <UserHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="rounded-xl hover:bg-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Histórico
            </Button>
            <Button onClick={onOpenChat} className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground">
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar com Professor
            </Button>
          </div>

          {/* Essay Info Card */}
          <div className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-foreground mb-2">{essay.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(essay.date)}
                  </span>
                  <span>{essay.text.split(/\s+/).length} palavras</span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold ${getScoreColor(correction.totalScore)}`}>{correction.totalScore}</p>
                <p className="text-sm text-muted-foreground">de 1000</p>
              </div>
            </div>
          </div>

          {/* Total Score Card */}
          <div className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Nota Final</h2>
                  <p className="text-sm text-muted-foreground">Baseada nas 5 competências do ENEM</p>
                </div>
              </div>
            </div>
            <Progress value={(correction.totalScore / 1000) * 100} className="h-2 rounded-full" />
          </div>

          {/* General Feedback */}
          <div className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-foreground">Feedback Geral</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{correction.generalFeedback}</p>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-foreground">Pontos Fortes</h3>
              </div>
              <ul className="space-y-2">
                {correction.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-foreground">Pontos a Melhorar</h3>
              </div>
              <ul className="space-y-2">
                {correction.improvements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Competency Scores */}
          <div className="glass rounded-3xl p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-5">Competências ENEM</h3>
            <div className="space-y-5">
              {correction.competencies.map((comp) => (
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
                      className={`absolute top-0 left-0 h-full rounded-full ${comp.color} transition-all duration-500`}
                      style={{ width: `${(comp.score / comp.maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground italic">{comp.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Essay Preview */}
          <div className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Sua Redação</h3>
            </div>
            <div className="bg-muted/30 rounded-2xl p-4 max-h-80 overflow-y-auto">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{essay.text}</p>
            </div>
          </div>

          {/* CTA to chat */}
          <div className="glass rounded-3xl p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Tem dúvidas sobre esta correção?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Converse com um professor para entender melhor o feedback e como melhorar.
            </p>
            <Button onClick={onOpenChat} className="rounded-2xl bg-primary hover:bg-primary/90">
              <MessageCircle className="w-4 h-4 mr-2" />
              Iniciar Conversa com Professor
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
