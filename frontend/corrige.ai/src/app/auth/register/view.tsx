import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Check } from "lucide-react"
import { Controller } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { useToast } from "@/shared/hooks/use-toast"
import { getAuthErrorMessage } from "../utils/auth-error"
import { useRegister } from "../hooks/useRegister"
import { useEffect } from "react"

export default function RegisterPage() {
    const [ showPassword, setShowPassword ] = useState(false)
    const { form, handleRegister, loading, error, clearError } = useRegister()
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
    }, [ error, toast, clearError ])

    return (
        <div className="min-h-screen flex">
            {/* Lado esquerdo - Branding */}
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
                            {[ 1, 2, 3, 4 ].map((i) => (
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
                        <h2 className="text-2xl font-semibold text-foreground">Criar sua conta</h2>
                        <p className="mt-2 text-muted-foreground">Comece gratuitamente, sem cartão de crédito</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">


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
                                    <Link to="#" className="text-foreground hover:underline">
                                        Termos de Uso
                                    </Link>{" "}
                                    e{" "}
                                    <Link to="#" className="text-foreground hover:underline">
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

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground pt-8">
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
