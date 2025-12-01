import { TrendingUp, TrendingDown } from "lucide-react"
import type { Essay } from "@/shared/lib/types"

interface EvolutionChartFullProps {
  essays: Essay[]
}

export function EvolutionChartFull({ essays }: EvolutionChartFullProps) {
  const sortedEssays = [...essays].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(-10)

  const chartData = sortedEssays.map((essay, index) => ({
    label: `R${index + 1}`,
    score: essay.correction.totalScore,
    date: essay.date,
    title: essay.title,
  }))

  const maxScore = 1000
  const minDisplayScore = Math.max(0, Math.min(...chartData.map((d) => d.score)) - 100)

  const currentScore = chartData.length > 0 ? chartData[chartData.length - 1].score : 0
  const previousScore = chartData.length > 1 ? chartData[chartData.length - 2].score : 0

  const trend = previousScore > 0 ? ((currentScore - previousScore) / previousScore) * 100 : 0
  const isPositive = trend >= 0

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Evolução de notas</h3>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          Envie redações para ver sua evolução
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-foreground">Evolução de notas</h3>
          <p className="text-sm text-muted-foreground">Últimas {chartData.length} redações</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          {isPositive ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-rose-500" />}
          <span className={`font-medium ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {isPositive ? "+" : ""}{trend.toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="h-56 flex items-end gap-2 md:gap-3 px-2">
        {chartData.map((data, index) => {
          const height = ((data.score - minDisplayScore) / (maxScore - minDisplayScore)) * 100
          const isLast = index === chartData.length - 1
          const getScoreColor = (score: number, isRecent: boolean) => {
            if (score >= 900) return isRecent ? "bg-emerald-500" : "bg-emerald-500/30"
            if (score >= 600) return isRecent ? "bg-amber-500" : "bg-amber-500/30"
            return isRecent ? "bg-red-500" : "bg-red-500/30"
          }

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="glass rounded-lg p-3 text-xs whitespace-nowrap">
                  <p className="font-medium text-foreground">{data.score} pontos</p>
                  <p className="text-muted-foreground truncate max-w-32">{data.title}</p>
                </div>
              </div>

              <div className="w-full h-48 flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer hover:opacity-80 ${getScoreColor(data.score, isLast)}`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.label}</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-border/50 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">900+ pontos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-muted-foreground">600-899 pontos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Abaixo de 600</span>
        </div>
      </div>
    </div>
  )
}
