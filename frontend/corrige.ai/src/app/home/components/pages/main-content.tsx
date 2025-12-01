import { useState } from "react"
import { WelcomeSection } from "@/app/home/components/welcome-section"
import { FeatureCards } from "@/app/home/components/feature-cards"
import { EssayInput } from "@/app/home/components/essay-input"
import { CorrectionPanel } from "@/app/home/components/correction-panel"
import { CorrectionLoading } from "@/app/home/components/correction-loading"
import type { User } from "firebase/auth"
import type { Essay } from "@/shared/lib/types"
import { useEssayController } from "@/app/home/controllers"
import { useToast } from "@/shared/hooks/use-toast"
import type { ICreateEssayRequest } from "@/app/home/models"
import { UserHeader } from "../user-header"

interface MainContentProps {
  onOpenChat: () => void
  hasCorrection: boolean
  user: User | null
  essays: Essay[]
}

type ViewState = "input" | "loading" | "correction"

export function MainContent({ onOpenChat, hasCorrection, user, essays }: MainContentProps) {
  const [ viewState, setViewState ] = useState<ViewState>("input")
  const [ essayText, setEssayText ] = useState("")
  const { toast } = useToast()
  const { uploadEssay, currentEssay } = useEssayController()

  const handleBack = () => {
    setViewState("input")
    setEssayText("")
  }

  const handleSubmitEssay = async (data: ICreateEssayRequest) => {
    setViewState("loading")
    try {
      const result = await uploadEssay(data)
      setEssayText(result.text)
      setViewState("correction")
      toast({
        title: "Redação enviada!",
        description: "Sua redação foi enviada para correção com sucesso.",
      })
    } catch {
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
      <UserHeader user={user} onOpenChat={onOpenChat} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {viewState === "input" && (
            <>
              <WelcomeSection />
              <FeatureCards hasCorrection={hasCorrection} />
              <EssayInput
                user={user}
                onSubmit={handleSubmitEssay}
              />
            </>
          )}

          {viewState === "loading" && <CorrectionLoading />}

          {viewState === "correction" && currentEssay && (
            <CorrectionPanel
              essayText={essayText}
              correctionData={currentEssay.correction}
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


