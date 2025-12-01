export type AppView = "home" | "history" | "essay-detail"

export interface CompetencyResult {
  id: number
  name: string
  score: number
  maxScore: number
  description: string
  color: string
  feedback: string
}

export interface CorrectionResult {
  totalScore: number
  competencies: CompetencyResult[]
  generalFeedback: string
  strengths: string[]
  improvements: string[]
}

export interface Essay {
  id: string
  title: string
  text: string
  date: Date
  correction: CorrectionResult
}