import { useState, useEffect } from "react"
import { Sidebar } from "@/app/home/components/sidebar"
import { ProfessorChat } from "@/app/home/components/professor-chat"
import { type AppView, type Essay } from "@/shared/lib/types"
import { useAuth } from "@/app/auth/contexts/auth-context"
import { useEssayController } from "@/app/home/controllers"
import { useTheme } from "@/shared/components/theme-provider"
import { Aurora } from "@/shared/components/ui/aurora-background"

import { EssayDetailPanel, EssaysHistoryPage, MainContent } from "./components/pages"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentView, setCurrentView] = useState<AppView>("home")
  const { resolvedTheme } = useTheme()
  const { user } = useAuth()

  // Usa o controlador Zustand para gerenciar estado das redações
  const { essays, currentEssay, loadUserEssays, selectEssay } = useEssayController()

  // Carrega as redações do usuário ao montar o componente
  useEffect(() => {
    if (user?.uid) {
      loadUserEssays(user.uid)
    }
  }, [user, loadUserEssays])

  // Seleciona uma redação e navega para a tela de detalhes
  const handleSelectEssay = (essay: Essay) => {
    selectEssay(essay)
    setCurrentView("essay-detail")
  }

  const hasCorrection = essays.length > 0

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

        {currentView === "essay-detail" && currentEssay && (
          <EssayDetailPanel
            essay={currentEssay}
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
