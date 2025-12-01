import { useState, useEffect } from "react"
import { Sidebar } from "@/app/home/components/sidebar"
import { MainContent } from "@/app/home/components/main-content"
import { EssaysHistoryPage } from "@/app/home/components/essays-history-page"
import { EssayDetailPanel } from "@/app/home/components/essay-detail-panel"
import { ProfessorChat } from "@/app/home/components/professor-chat"
import { type Essay, type AppView } from "@/shared/lib/types"
import { useAuth } from "@/app/auth/contexts/auth-context"
import { EssayService } from "./services/EssayService"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasCorrection, setHasCorrection] = useState(false)
  const [currentView, setCurrentView] = useState<AppView>("home")
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null)
  const [essays, setEssays] = useState<Essay[]>([])

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadEssays()
    }
  }, [user])

  const loadEssays = async () => {
    if (user?.uid) {
      try {
        const data = await EssayService.getUserEssays(user.uid)
        setEssays(data)
        setHasCorrection(data.length > 0)
      } catch (error) {
        console.error("Failed to load essays", error)
      }
    }
  }

  const handleSelectEssay = (essay: Essay) => {
    setSelectedEssay(essay)
    setCurrentView("essay-detail")
  }

  const handleNewEssayComplete = () => {
    // Refresh essays list or add the new one if we had the full object.
    // Since MainContent now gets the full essay object on success, we can update it there or just reload.
    // For now, let's reload to be safe and simple, or better, we can just fetch again.
    loadEssays()
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
          essays={essays}
        />
      )}

      {currentView === "history" && (
        <EssaysHistoryPage
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
