import { useState } from "react"
import { UserHeader } from "./user-header"
import { WelcomeSection } from "@/app/home/components/welcome-section"
import { FeatureCards } from "@/app/home/components/feature-cards"
import { EssayInput } from "@/app/home/components/essay-input"
import { CorrectionPanel } from "@/app/home/components/correction-panel"
import { CorrectionLoading } from "@/app/home/components/correction-loading"
import type { CorrectionResult } from "@/shared/lib/types"
import type { User } from "firebase/auth"

import { EssayService, type ICreateEssay } from "@/app/home/services/EssayService"
import { useToast } from "@/shared/hooks/use-toast"
import type { Essay } from "@/shared/lib/types"

interface MainContentProps {
  onOpenChat: () => void
  hasCorrection: boolean
  onCorrectionComplete: (essayText: string, correction: CorrectionResult) => void
  user: User | null
  essays: Essay[]
}

type ViewState = "input" | "loading" | "correction"

export function MainContent({ onOpenChat, hasCorrection, onCorrectionComplete, user, essays }: MainContentProps) {
  const [viewState, setViewState] = useState<ViewState>("input")
  const [essayText, setEssayText] = useState("")
  const [correctionData, setCorrectionData] = useState<CorrectionResult | null>(null)
  const { toast } = useToast()

  const handleBack = () => {
    setViewState("input")
    setEssayText("")
    setCorrectionData(null)
  }

  const handleSubmitEssay = async (data: ICreateEssay) => {
    setViewState("loading")
    try {
      const result = await EssayService.uploadEssay(data)
      setCorrectionData(result.correction)
      setEssayText(result.text)
      setViewState("correction")
      onCorrectionComplete(result.text, result.correction)
      toast({
        title: "Redação enviada!",
        description: "Sua redação foi enviada para correção com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua redação. Tente novamente.",
        variant: "destructive",
      })
      setViewState("input")
    }
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
                user={user}
                onSubmit={handleSubmitEssay}
              />
            </>
          )}

          {viewState === "loading" && <CorrectionLoading />}

          {viewState === "correction" && correctionData && (
            <CorrectionPanel
              essayText={essayText}
              correctionData={correctionData}
              essays={essays}
              onBack={handleBack}
              onOpenChat={onOpenChat}
            />
          )}
        </div>
      </div>
    </main>
  )
}


