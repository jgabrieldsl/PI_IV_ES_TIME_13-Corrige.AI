import { Progress } from "@/shared/components/ui/progress"

const competencies = [
  {
    id: 1,
    name: "Domínio da Norma Culta",
    score: 160,
    maxScore: 200,
    description: "Gramática e ortografia",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Compreensão do Tema",
    score: 180,
    maxScore: 200,
    description: "Interpretação e abordagem",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Seleção e Organização",
    score: 160,
    maxScore: 200,
    description: "Argumentos e estrutura",
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Coesão Textual",
    score: 140,
    maxScore: 200,
    description: "Conectivos e fluidez",
    color: "bg-amber-500",
  },
  {
    id: 5,
    name: "Proposta de Intervenção",
    score: 180,
    maxScore: 200,
    description: "Solução detalhada",
    color: "bg-pink-500",
  },
]

export function CompetencyScores() {
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-semibold text-foreground mb-5">Competências ENEM</h3>
      <div className="space-y-5">
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
            <div className="relative">
              <Progress value={(comp.score / comp.maxScore) * 100} className="h-2 rounded-full bg-muted" />
              <div
                className={`absolute top-0 left-0 h-2 rounded-full ${comp.color} transition-all`}
                style={{ width: `${(comp.score / comp.maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
