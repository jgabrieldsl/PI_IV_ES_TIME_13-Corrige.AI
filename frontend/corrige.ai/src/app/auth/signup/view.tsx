import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Check } from "lucide-react"
import { Controller } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { useToast } from "@/shared/hooks/use-toast"
import { getAuthErrorMessage } from "../utils/auth-error"
import { useSignup } from "../hooks/useSignup"
import { useEffect } from "react"

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const { form, handleSignup, loading, error, clearError } = useSignup()
    const { register, control, watch, formState: { errors } } = form
    const { toast } = useToast()

    const password = watch("password", "")

    const passwordRequirements = [
        { label: "Mínimo 8 caracteres", met: password.length >= 8 },
        { label: "Uma letra maiúscula", met: /[A-Z]/.test(password) },
        { label: "Um número", met: /\d/.test(password) },
    ]

    useEffect(() => {
        if (error) {
            const errorMessage = getAuthErrorMessage(error)
            toast({
                variant: "destructive",
                title: "Erro no cadastro",
                description: errorMessage,
            })
            clearError()
        }
    }, [error, toast, clearError])

    return (
        <div className="min-h-screen flex">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div>
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-foreground" />
                            </div>
                            <span className="text-2xl font-semibold text-background tracking-tight">Corrige.AI</span>
                        </Link>
                    </div>

                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold text-background leading-tight text-balance">
                            Comece sua jornada para a nota máxima
                        </h1>
                        <p className="mt-6 text-background/70 text-lg leading-relaxed">
                            Junte-se a milhares de estudantes que já transformaram suas redações com nossa IA especializada.
                        </p>

                        <div className="mt-10 space-y-4">
                            {[
                                "Correções ilimitadas por mês",
                                "Feedback detalhado por competência",
                                "Acompanhamento de evolução",
                                "Sugestões personalizadas de melhoria",
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-background" />
                                    </div>
                                    <span className="text-background/80">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-background/30 border-2 border-foreground flex items-center justify-center text-xs text-background font-medium"
                                >
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-background/70">
                            <span className="font-semibold text-background">+2.500</span> novos usuários este mês
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-background" />
                            </div>
                            <span className="text-2xl font-semibold text-foreground tracking-tight">Corrige.AI</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground">Criar sua conta</h2>
                        <p className="mt-2 text-muted-foreground">Comece gratuitamente, sem cartão de crédito</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Nome completo
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome"
                                    className={`pl-10 h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                    {...register("name")}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

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
                            {password && (
                                <div className="mt-3 space-y-2">
                                    {passwordRequirements.map((req, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-2 text-xs ${req.met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                                                    }`}
                                            >
                                                {req.met && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            {req.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <Controller
                                    name="terms"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="terms"
                                            className="mt-0.5"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                                    Eu concordo com os{" "}
                                    <Link to="/terms" className="text-foreground hover:underline">
                                        Termos de Uso
                                    </Link>{" "}
                                    e{" "}
                                    <Link to="/privacy" className="text-foreground hover:underline">
                                        Política de Privacidade
                                    </Link>
                                </Label>
                            </div>
                            {errors.terms && (
                                <p className="text-sm text-destructive">{errors.terms.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Criando conta...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Criar conta
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background text-muted-foreground">ou continue com</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-11 bg-transparent">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="h-11 bg-transparent">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>

                        <p className="mt-8 text-center text-sm text-muted-foreground">
                            Já tem uma conta?{" "}
                            <Link to="/auth/login" className="font-medium text-foreground hover:underline">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
