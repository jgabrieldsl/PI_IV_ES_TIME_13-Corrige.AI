import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/shared/lib/firebase"

import type { User } from "firebase/auth"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground animate-pulse">Carregando...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return <>{children}</>
}
