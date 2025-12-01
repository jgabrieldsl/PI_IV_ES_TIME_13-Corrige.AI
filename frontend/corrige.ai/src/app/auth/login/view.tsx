import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { useToast } from "@/shared/hooks/use-toast"
import { getAuthErrorMessage } from "../utils/auth-error"
import { useLogin } from "../hooks/useLogin"
import { useEffect } from "react"

export default function LoginPage() {
    const [ showPassword, setShowPassword ] = useState(false)
    const { form, handleLogin, loading, error, clearError } = useLogin()
    const { register, formState: { errors } } = form
    const { toast } = useToast()

    useEffect(() => {
        if (error) {
            const errorMessage = getAuthErrorMessage(error)
            toast({
                variant: "destructive",
                title: "Erro no login",
                description: errorMessage,
            })
            clearError()
        }
    }, [ error, toast, clearError ])

    return (
        <div className="min-h-screen flex">
            {/* Lado esquerdo - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div>
                        <Link to="/" className="flex items-center gap-3">
                            <span className="text-2xl font-semibold text-background tracking-tight">Corrige.AI</span>
                        </Link>
                    </div>

                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold text-background leading-tight text-balance">
                            Aprimore suas redações com inteligência artificial
                        </h1>
                        <p className="mt-6 text-background/70 text-lg leading-relaxed">
                            Correções precisas, feedback detalhado e evolução constante. Sua jornada para a nota 1000 começa aqui.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-3xl font-bold text-background">98%</p>
                            <p className="text-sm text-background/60">Satisfação</p>
                        </div>
                        <div className="w-px h-12 bg-background/20" />
                        <div>
                            <p className="text-3xl font-bold text-background">50k+</p>
                            <p className="text-sm text-background/60">Redações corrigidas</p>
                        </div>
                        <div className="w-px h-12 bg-background/20" />
                        <div>
                            <p className="text-3xl font-bold text-background">4.9</p>
                            <p className="text-sm text-background/60">Avaliação média</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lado direito - Formulário */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    {/* Logo móvel */}
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-background" />
                            </div>
                            <span className="text-2xl font-semibold text-foreground tracking-tight">Corrige.AI</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground">Bem-vindo de volta</h2>
                        <p className="mt-2 text-muted-foreground">Entre na sua conta para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                E-mail
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className={`pl-10 h-11 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Senha
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`pl-10 pr-10 h-11 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                                Lembrar de mim
                            </Label>
                        </div>

                        <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Entrando...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Entrar
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground pt-8">
                            Não tem uma conta?{" "}
                            <Link to="/auth/register" className="font-medium text-foreground hover:underline">
                                Criar conta
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
