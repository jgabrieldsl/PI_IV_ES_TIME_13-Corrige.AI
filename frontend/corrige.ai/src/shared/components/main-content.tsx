import { useState } from "react"
import { UserHeader } from "./user-header"
import { WelcomeSection } from "./welcome-section"
import { FeatureCards } from "./feature-cards"
import { EssayInput } from "./essay-input"
import { CorrectionPanel } from "./correction-panel"
import { CorrectionLoading } from "./correction-loading"
import type { CompetencyResult, CorrectionResult } from "@/shared/lib/types"
import type { User } from "firebase/auth"

interface MainContentProps {
  onOpenChat: () => void
  hasCorrection: boolean
  onCorrectionComplete: (essayText: string, correction: CorrectionResult) => void
  user: User | null
}

type ViewState = "input" | "loading" | "correction"

export function MainContent({ onOpenChat, hasCorrection, onCorrectionComplete, user }: MainContentProps) {
  const [viewState, setViewState] = useState<ViewState>("input")
  const [essayText, setEssayText] = useState("")
  const [correctionData, setCorrectionData] = useState<CorrectionResult | null>(null)
  const [theme, setTheme] = useState("")
  const [customTheme, setCustomTheme] = useState("")

  const handleSubmitEssay = () => {
    if (essayText.trim().length < 100) return
    if (!theme || (theme === "outros" && !customTheme.trim())) return

    setViewState("loading")

    // Simulate AI correction process
    setTimeout(() => {
      const result = generateCorrectionResult(essayText)
      setCorrectionData(result)
      setViewState("correction")
      onCorrectionComplete(essayText, result)
    }, 3000)
  }

  const handleBack = () => {
    setViewState("input")
    setEssayText("")
    setCorrectionData(null)
    setTheme("")
    setCustomTheme("")
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <UserHeader user={user} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {viewState === "input" && (
            <>
              <WelcomeSection />
              <FeatureCards hasCorrection={hasCorrection} onOpenChat={onOpenChat} />
              <EssayInput
                value={essayText}
                onChange={setEssayText}
                onSubmit={handleSubmitEssay}
                theme={theme}
                onThemeChange={setTheme}
                customTheme={customTheme}
                onCustomThemeChange={setCustomTheme}
              />
            </>
          )}

          {viewState === "loading" && <CorrectionLoading />}

          {viewState === "correction" && correctionData && (
            <CorrectionPanel
              essayText={essayText}
              correctionData={correctionData}
              onBack={handleBack}
              onOpenChat={onOpenChat}
            />
          )}
        </div>
      </div>
    </main>
  )
}

function generateCorrectionResult(essayText: string): CorrectionResult {
  const wordCount = essayText.split(/\s+/).length
  const baseScore = Math.min(wordCount / 2, 160)

  const competencies: CompetencyResult[] = [
    {
      id: 1,
      name: "Domínio da Norma Culta",
      score: Math.floor(baseScore + Math.random() * 40),
      maxScore: 200,
      description: "Gramática e ortografia",
      color: "bg-violet-500",
      feedback: "Demonstra bom domínio da norma culta, com poucos desvios gramaticais.",
    },
    {
      id: 2,
      name: "Compreensão do Tema",
      score: Math.floor(baseScore + Math.random() * 40),
      maxScore: 200,
      description: "Interpretação e abordagem",
      color: "bg-blue-500",
      feedback: "Compreende bem o tema proposto e desenvolve uma tese clara.",
    },
    {
      id: 3,
      name: "Seleção e Organização",
      score: Math.floor(baseScore + Math.random() * 40),
      maxScore: 200,
      description: "Argumentos e estrutura",
      color: "bg-fuchsia-500",
      feedback: "Apresenta argumentos relevantes com boa organização textual.",
    },
    {
      id: 4,
      name: "Coesão Textual",
      score: Math.floor(baseScore + Math.random() * 40),
      maxScore: 200,
      description: "Conectivos e fluidez",
      color: "bg-sky-500",
      feedback: "Utiliza conectivos adequados, mantendo a coesão entre parágrafos.",
    },
    {
      id: 5,
      name: "Proposta de Intervenção",
      score: Math.floor(baseScore + Math.random() * 40),
      maxScore: 200,
      description: "Solução detalhada",
      color: "bg-rose-500",
      feedback: "Proposta de intervenção apresentada, mas pode ser mais detalhada.",
    },
  ]

  const totalScore = competencies.reduce((acc, c) => acc + c.score, 0)

  return {
    totalScore,
    competencies,
    generalFeedback:
      "Sua redação apresenta uma estrutura sólida com argumentação consistente. Continue praticando para aprimorar ainda mais sua escrita.",
    strengths: [
      "Boa estruturação dos parágrafos",
      "Tese clara e bem definida",
      "Vocabulário adequado ao gênero textual",
    ],
    improvements: [
      "Desenvolver mais a proposta de intervenção",
      "Utilizar mais conectivos variados",
      "Aprofundar os argumentos com dados e exemplos",
    ],
  }
}
