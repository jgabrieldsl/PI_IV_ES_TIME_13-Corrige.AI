import { useState } from "react"
import { Sidebar } from "@/shared/components/sidebar"
import { MainContent } from "@/shared/components/main-content"
import { EssaysHistoryPage } from "@/shared/components/essays-history-page"
import { EssayDetailPanel } from "@/shared/components/essay-detail-panel"
import { ProfessorChat } from "@/shared/components/professor-chat"
import { mockEssays, type Essay, type CorrectionResult, type AppView } from "@/shared/lib/types"
import { useAuth } from "@/app/auth/contexts/auth-context"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasCorrection, setHasCorrection] = useState(mockEssays.length > 0)
  const [currentView, setCurrentView] = useState<AppView>("home")
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null)
  const [essays, setEssays] = useState<Essay[]>(mockEssays)

  const { user } = useAuth()

  const handleSelectEssay = (essay: Essay) => {
    setSelectedEssay(essay)
    setCurrentView("essay-detail")
  }

  const handleNewEssayComplete = (essayText: string, correction: CorrectionResult) => {
    const newEssay: Essay = {
      id: Date.now().toString(),
      title: essayText.substring(0, 40) + "...",
      text: essayText,
      date: new Date(),
      correction,
    }
    setEssays([newEssay, ...essays])
    setHasCorrection(true)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        essays={essays}
        onSelectEssay={handleSelectEssay}
        user={user}
      />

      {currentView === "home" && (
        <MainContent
          onOpenChat={() => setIsChatOpen(true)}
          hasCorrection={hasCorrection}
          onCorrectionComplete={handleNewEssayComplete}
          user={user}
        />
      )}

      {currentView === "history" && (
        <EssaysHistoryPage
          essays={essays}
          onSelectEssay={handleSelectEssay}
          onOpenChat={() => setIsChatOpen(true)}
          user={user}
        />
      )}

      {currentView === "essay-detail" && selectedEssay && (
        <EssayDetailPanel
          essay={selectedEssay}
          onBack={() => setCurrentView("history")}
          onOpenChat={() => setIsChatOpen(true)}
          user={user}
        />
      )}

      {hasCorrection && <ProfessorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  )
}
