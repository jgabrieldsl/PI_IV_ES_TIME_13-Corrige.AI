import { useState, useEffect, useCallback } from "react"
import { FileText, Calendar, TrendingUp, Search, ArrowUpRight, MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { UserHeader } from "@/app/home/components/user-header"
import { EvolutionChartFull } from "@/app/home/components/evolution-chart-full"
import type { Essay } from "@/shared/lib/types"
import type { User } from "firebase/auth"
import { EssayService } from "@/app/home/services/EssayService"
import { useToast } from "@/shared/hooks/use-toast"

interface EssaysHistoryPageProps {
  onSelectEssay: (essay: Essay) => void
  onOpenChat: () => void
  user: User | null
}

export function EssaysHistoryPage({ onSelectEssay, onOpenChat, user }: EssaysHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [essays, setEssays] = useState<Essay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const loadEssays = useCallback(async () => {
    try {
      setIsLoading(true)
      if (user?.uid) {
        const data = await EssayService.getUserEssays(user.uid)
        setEssays(data)
      }
    } catch {
      toast({
        title: "Erro ao carregar redações",
        description: "Não foi possível carregar seu histórico. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    if (user) {
      loadEssays()
    }
  }, [user, loadEssays])

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

  const bestScore = essays.length > 0 ? Math.max(...essays.map((essay) => essay.correction.totalScore)) : 0

  if (isLoading) {
    return (
      <main className="flex-1 flex flex-col overflow-hidden">
        <UserHeader user={user} onOpenChat={onOpenChat} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <UserHeader user={user} onOpenChat={onOpenChat} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Histórico de Redações</h1>
              <p className="text-muted-foreground">Acompanhe sua evolução e revise suas correções anteriores</p>
            </div>
            <Button onClick={onOpenChat} className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground">
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar com o professor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-5 gradient-ai-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">Total de redações</span>
              </div>
              <p className="text-3xl font-bold text-foreground ml-2">{essays.length}</p>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Nota média</span>
              </div>
              <p className="text-3xl font-bold text-foreground ml-2">{averageScore}</p>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Melhor nota</span>
              </div>
              <p className="text-3xl font-bold text-foreground ml-2">{bestScore}</p>
            </div>
          </div>

          <EvolutionChartFull essays={essays} />

          <div className="glass rounded-xl p-5 mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">Todas as Redações</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar redação..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 rounded-lg bg-muted/50 border-0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {filteredEssays.map((essay) => (
                <button
                  key={essay.id}
                  onClick={() => onSelectEssay(essay)}
                  className="w-full glass-subtle rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors group text-left cursor-pointer"
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
                  <p className="text-muted-foreground">
                    {essays.length === 0 ? "Nenhuma redação enviada" : "Nenhuma redação encontrada"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
