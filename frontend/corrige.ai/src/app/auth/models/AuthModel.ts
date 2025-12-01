import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória"),
})

export const registerSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/[A-Z]/, "Uma letra maiúscula")
        .regex(/\d/, "Um número"),
    terms: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
})

export type LoginCredentials = z.infer<typeof loginSchema>
export type RegisterCredentials = z.infer<typeof registerSchema>

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
}
