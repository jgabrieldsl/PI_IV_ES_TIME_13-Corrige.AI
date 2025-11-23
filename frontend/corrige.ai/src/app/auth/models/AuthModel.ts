import * as z from "zod"

// Zod Schemas
export const loginSchema = z.object({
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
})

export const signupSchema = z.object({
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

// TypeScript Types
export type LoginCredentials = z.infer<typeof loginSchema>
export type SignupCredentials = z.infer<typeof signupSchema>

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
}
