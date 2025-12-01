import { Link } from "react-router-dom"
import { Mail, ArrowRight, Sparkles, Check, ArrowLeft } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useToast } from "@/shared/hooks/use-toast"
import { getAuthErrorMessage } from "../utils/auth-error"
import { useResetPassword } from "../hooks/useResetPassword"
import { useEffect, useState } from "react"

export default function ForgotPasswordPage() {
    const { form, resetPassword, loading, error, clearError } = useResetPassword()
    const { register, formState: { errors } } = form
    const { toast } = useToast()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (error) {
            const errorMessage = getAuthErrorMessage(error)
            toast({
                variant: "destructive",
                title: "Erro ao enviar email",
                description: errorMessage,
            })
            clearError()
        }
    }, [error, toast, clearError])

    const onSubmit = async (data: { email: string }) => {
        await resetPassword(data)
        setSuccess(true)
        toast({
            title: "Email enviado",
            description: "Verifique sua caixa de entrada para redefinir sua senha.",
        })
    }

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
                            Recupere seu acesso
                        </h1>
                        <p className="mt-6 text-background/70 text-lg leading-relaxed">
                            Não se preocupe, vamos ajudar você a voltar a focar na sua nota máxima.
                        </p>

                        <div className="mt-10 space-y-4">
                            {[
                                "Processo rápido e seguro",
                                "Link válido por 24 horas",
                                "Suporte disponível se precisar",
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
                        <p className="text-sm text-background/70">
                            &copy; {new Date().getFullYear()} Corrige.AI. Todos os direitos reservados.
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
                        <Link to="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para o login
                        </Link>
                        <h2 className="text-2xl font-semibold text-foreground">Esqueceu sua senha?</h2>
                        <p className="mt-2 text-muted-foreground">
                            Digite seu email e enviaremos um link para você redefinir sua senha.
                        </p>
                    </div>

                    {success ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">Email enviado!</h3>
                            <p className="text-green-700 dark:text-green-300 mb-6">
                                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => setSuccess(false)}>
                                Tentar outro email
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

                            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Enviando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Enviar link de recuperação
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
