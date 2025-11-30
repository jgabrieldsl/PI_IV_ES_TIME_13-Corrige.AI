"use client"

import { Plus, FileText, Sparkles, ChevronRight, History, Home } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import type { Essay, AppView } from "@/shared/lib/types"

interface SidebarProps {
  currentView: AppView
  onNavigate: (view: AppView) => void
  essays: Essay[]
  onSelectEssay: (essay: Essay) => void
}

export function Sidebar({ currentView, onNavigate, essays, onSelectEssay }: SidebarProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Hoje"
    if (days === 1) return "Ontem"
    if (days < 7) return `${days} dias`
    return `${Math.floor(days / 7)} sem`
  }

  return (
    <aside className="w-72 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-lg gradient-ai flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-foreground">Corrige.AI</span>
        </button>
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <div className="px-3 mb-4">
        <nav className="space-y-1">
          <button
            onClick={() => onNavigate("home")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${currentView === "home"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Inicio</span>
          </button>
          <button
            onClick={() => onNavigate("history")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${currentView === "history" || currentView === "essay-detail"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              }`}
          >
            <History className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Historico</span>
            <Badge variant="secondary" className="text-xs">
              {essays.length}
            </Badge>
          </button>
        </nav>
      </div>

      {/* New Essay Button */}
      <div className="px-4 mb-6">
        <Button
          onClick={() => onNavigate("home")}
          className="w-full justify-between rounded-xl h-11 bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nova Redacao</span>
          </div>
          <kbd className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">Ctrl+N</kbd>
        </Button>
      </div>

      {/* Recent Essays */}
      <div className="flex-1 px-3 overflow-y-auto">
        <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Recentes</p>
        <nav className="space-y-1">
          {essays.slice(0, 5).map((essay) => (
            <button
              key={essay.id}
              onClick={() => onSelectEssay(essay)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors group"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <div className="flex-1 text-left min-w-0">
                <p className="truncate">{essay.title}</p>
                <p className="text-xs opacity-60">{formatDate(essay.date)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">{essay.correction.totalScore}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </nav>
        {essays.length > 5 && (
          <button
            onClick={() => onNavigate("history")}
            className="w-full mt-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todas ({essays.length})
          </button>
        )}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-subtle rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 ring-2 ring-border">
              <AvatarImage src="/student-avatar.png" />
              <AvatarFallback className="bg-secondary text-foreground">MA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Maria A.</p>
              <p className="text-xs text-muted-foreground truncate">maria@email.com</p>
            </div>
            <Badge className="bg-secondary text-muted-foreground hover:bg-secondary border-0">Pro</Badge>
          </div>
          <Button className="w-full rounded-lg gradient-ai hover:opacity-90 text-white border-0 h-10">
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade Premium
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-4 py-3 flex gap-4 text-xs text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">
          Como funciona
        </a>
        <a href="#" className="hover:text-foreground transition-colors">
          Privacidade
        </a>
      </div>
    </aside>
  )
}
