import { TrendingUp } from "lucide-react"

const chartData = [
  { week: "S1", score: 620 },
  { week: "S2", score: 680 },
  { week: "S3", score: 720 },
  { week: "S4", score: 760 },
  { week: "S5", score: 780 },
  { week: "S6", score: 820 },
]

export function EvolutionChart() {
  const maxScore = 1000
  const minScore = Math.min(...chartData.map((d) => d.score)) - 100

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Evolucao</h3>
        <div className="flex items-center gap-1 text-sm">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">+32%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 flex items-end gap-3">
        {chartData.map((data, index) => {
          const height = ((data.score - minScore) / (maxScore - minScore)) * 100
          const isLast = index === chartData.length - 1

          return (
            <div key={data.week} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full h-36 flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${isLast ? "gradient-ai" : "bg-foreground/30"
                    }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.week}</span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full gradient-ai" />
          <span className="text-xs text-muted-foreground">Nota atual: 820</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground/30" />
          <span className="text-xs text-muted-foreground">Notas anteriores</span>
        </div>
      </div>
    </div>
  )
}
