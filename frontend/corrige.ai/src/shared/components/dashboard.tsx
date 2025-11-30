"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { MainContent } from "./main-content"
import { EssaysHistoryPage } from "./essays-history-page"
import { EssayDetailPanel } from "./essay-detail-panel"
import { ProfessorChat } from "./professor-chat"
import { mockEssays, type Essay, type CorrectionResult } from "@/shared/lib/types"

export type AppView = "home" | "history" | "essay-detail"

export function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasCorrection, setHasCorrection] = useState(mockEssays.length > 0)
  const [currentView, setCurrentView] = useState<AppView>("home")
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null)
  const [essays, setEssays] = useState<Essay[]>(mockEssays)

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
      />

      {currentView === "home" && (
        <MainContent
          onOpenChat={() => setIsChatOpen(true)}
          hasCorrection={hasCorrection}
          onCorrectionComplete={handleNewEssayComplete}
        />
      )}

      {currentView === "history" && (
        <EssaysHistoryPage essays={essays} onSelectEssay={handleSelectEssay} onOpenChat={() => setIsChatOpen(true)} />
      )}

      {currentView === "essay-detail" && selectedEssay && (
        <EssayDetailPanel
          essay={selectedEssay}
          onBack={() => setCurrentView("history")}
          onOpenChat={() => setIsChatOpen(true)}
        />
      )}

      {hasCorrection && <ProfessorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  )
}
