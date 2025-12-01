import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/app/home/components/sidebar"
import { MainContent } from "@/app/home/components/main-content"
import { EssaysHistoryPage } from "@/app/home/components/essays-history-page"
import { EssayDetailPanel } from "@/app/home/components/essay-detail-panel"
import { ProfessorChat } from "@/app/home/components/professor-chat"
import { type Essay, type AppView } from "@/shared/lib/types"
import { useAuth } from "@/app/auth/contexts/auth-context"
import { EssayService } from "./services/EssayService"
import { useTheme } from "@/shared/components/theme-provider"
import { Aurora } from "@/shared/components/ui/aurora-background"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasCorrection, setHasCorrection] = useState(false)
  const [currentView, setCurrentView] = useState<AppView>("home")
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null)
  const [essays, setEssays] = useState<Essay[]>([])
  const { resolvedTheme } = useTheme()

  const { user } = useAuth()

  const loadEssays = useCallback(async () => {
    if (user?.uid) {
      try {
        const data = await EssayService.getUserEssays(user.uid)
        setEssays(data)
        setHasCorrection(data.length > 0)
      } catch (error) {
        console.error("Failed to load essays", error)
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadEssays()
    }
  }, [user, loadEssays])

  const handleSelectEssay = (essay: Essay) => {
    setSelectedEssay(essay)
    setCurrentView("essay-detail")
  }

  const handleNewEssayComplete = () => {
    loadEssays()
    setHasCorrection(true)
  }

  return (
    <div className="relative flex h-screen bg-background overflow-hidden">
      {resolvedTheme === "dark" && (
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      )}

      <div className="relative z-10 flex w-full h-full">
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

        <ProfessorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  )
}
