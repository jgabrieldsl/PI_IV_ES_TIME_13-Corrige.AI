"use client"

import { Settings } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { ThemeToggle } from "@/shared/components/theme-toggle"

export function UserHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/student-avatar.png" />
          <AvatarFallback className="bg-primary/20 text-primary text-sm">MA</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">Maria A.</p>
          <p className="text-xs text-muted-foreground">maria@email.com</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-lg w-10 h-10 hover:bg-accent">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  )
}
