import { LogOut } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { signOut } from "firebase/auth"
import { auth } from "@/shared/lib/firebase"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/shared/hooks/use-toast"
import type { User } from "firebase/auth"

interface UserHeaderProps {
  user: User | null
}

export function UserHeader({ user }: UserHeaderProps) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/auth/login")
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta com sucesso.",
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Ocorreu um erro ao tentar sair da conta.",
      })
    }
  }

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Usuário"
  const initials = displayName.substring(0, 2).toUpperCase()

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.photoURL || "/student-avatar.png"} />
          <AvatarFallback className="bg-primary/20 text-primary text-sm">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">{displayName}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg w-10 h-10 hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
