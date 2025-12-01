import { TrendingUp, TrendingDown } from "lucide-react"
import type { Essay } from "@/shared/lib/types"

interface EvolutionChartProps {
  essays: Essay[]
}

export function EvolutionChart({ essays }: EvolutionChartProps) {
  // Ordenar redações por data e pegar as últimas 6
  const sortedEssays = [...essays].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(-6)

  const chartData = sortedEssays.map((essay, index) => ({
    week: `R${index + 1}`, // Usando R1, R2... para Redação 1, 2... já que "Semana" pode não ser preciso
    score: essay.correction.totalScore,
  }))

  const maxScore = 1000
  const minScore = Math.max(0, Math.min(...(chartData.length > 0 ? chartData.map((d) => d.score) : [0])) - 100)

  const currentScore = chartData.length > 0 ? chartData[chartData.length - 1].score : 0
  const previousScore = chartData.length > 1 ? chartData[chartData.length - 2].score : 0

  const trend = previousScore > 0 ? ((currentScore - previousScore) / previousScore) * 100 : 0
  const isPositive = trend >= 0

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-5 h-full flex flex-col justify-center items-center text-center">
        <h3 className="font-semibold text-foreground mb-2">Evolução</h3>
        <p className="text-sm text-muted-foreground">Envie sua primeira redação para ver o gráfico.</p>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Evolução</h3>
        <div className="flex items-center gap-1 text-sm">
          {isPositive ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-rose-500" />}
          <span className={`font-medium ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {isPositive ? "+" : ""}{trend.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-44 flex items-end gap-3">
        {chartData.map((data, index) => {
          const height = ((data.score - minScore) / (maxScore - minScore)) * 100
          const isLast = index === chartData.length
          // Definir cor baseada na nota
          const getScoreColor = (score: number, isRecent: boolean) => {
            if (score >= 900) return isRecent ? "bg-emerald-500" : "bg-emerald-500/30"
            if (score >= 600) return isRecent ? "bg-amber-500" : "bg-amber-500/30"
            return isRecent ? "bg-red-500" : "bg-red-500/30"
          }

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full h-36 flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${getScoreColor(data.score, isLast)}`}
                  style={{ height: `${Math.max(height, 5)}%` }} // Garantir pelo menos alguma altura
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.week}</span>
            </div>
          )
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 text-xs">
        <span className="text-muted-foreground">Nota atual: <span className="font-medium text-foreground">{currentScore}</span></span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">900+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">600+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-muted-foreground">&lt;600</span>
          </div>
        </div>
      </div>
    </div>
  )
}
