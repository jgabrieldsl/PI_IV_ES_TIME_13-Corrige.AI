import * as z from "zod"

// Zod Schemas
export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória"),
})

export const signupSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/[A-Z]/, "Uma letra maiúscula")
        .regex(/\d/, "Um número"),
    terms: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
})

// TypeScript Types
export type LoginCredentials = z.infer<typeof loginSchema>
export type SignupCredentials = z.infer<typeof signupSchema>

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
}
