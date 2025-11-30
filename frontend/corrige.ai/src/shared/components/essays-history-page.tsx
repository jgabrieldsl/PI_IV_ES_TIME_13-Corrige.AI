"use client"

import { useState } from "react"
import { FileText, Calendar, TrendingUp, Search, Filter, ArrowUpRight, MessageCircle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { UserHeader } from "./user-header"
import { EvolutionChartFull } from "./evolution-chart-full"
import type { Essay } from "@/shared/lib/types"

interface EssaysHistoryPageProps {
  essays: Essay[]
  onSelectEssay: (essay: Essay) => void
  onOpenChat: () => void
}

export function EssaysHistoryPage({ essays, onSelectEssay, onOpenChat }: EssaysHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEssays = essays.filter((essay) => essay.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const averageScore =
    essays.length > 0 ? Math.round(essays.reduce((acc, e) => acc + e.correction.totalScore, 0) / essays.length) : 0

  const bestScore = essays.length > 0 ? Math.max(...essays.map((e) => e.correction.totalScore)) : 0

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <UserHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Historico de Redacoes</h1>
              <p className="text-muted-foreground">Acompanhe sua evolucao e revise suas correcoes anteriores</p>
            </div>
            <Button onClick={onOpenChat} className="rounded-lg gradient-ai hover:opacity-90 text-white border-0">
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar com Professor
            </Button>
          </div>

          {/* Stats Cards - reduced rounding and neutral colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-5 gradient-ai-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg gradient-ai flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Total de Redacoes</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{essays.length}</p>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Nota Media</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{averageScore}</p>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Melhor Nota</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{bestScore}</p>
            </div>
          </div>

          {/* Evolution Chart */}
          <EvolutionChartFull essays={essays} />

          {/* Essays List */}
          <div className="glass rounded-xl p-5 mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">Todas as Redacoes</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar redacao..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 rounded-lg bg-muted/50 border-0"
                  />
                </div>
                <Button variant="outline" size="icon" className="rounded-lg bg-transparent">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {filteredEssays.map((essay) => (
                <button
                  key={essay.id}
                  onClick={() => onSelectEssay(essay)}
                  className="w-full glass-subtle rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors group text-left"
                >
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate mb-1">{essay.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(essay.date)}
                      </span>
                      <span>{essay.text.split(/\s+/).length} palavras</span>
                    </div>
                  </div>

                  {/* Competencies mini chart */}
                  <div className="hidden md:flex items-center gap-1">
                    {essay.correction.competencies.map((comp) => (
                      <div
                        key={comp.id}
                        className="w-2 h-8 rounded-sm bg-muted overflow-hidden"
                        title={`C${comp.id}: ${comp.score}/${comp.maxScore}`}
                      >
                        <div
                          className="w-full bg-foreground/50"
                          style={{ height: `${(comp.score / comp.maxScore) * 100}%`, marginTop: "auto" }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-foreground">{essay.correction.totalScore}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}

              {filteredEssays.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma redacao encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
