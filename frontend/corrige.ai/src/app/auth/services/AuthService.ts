import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/shared/lib/firebase"
import type { LoginCredentials, RegisterCredentials, AuthUser } from "../models"

export class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthUser> {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
        )

        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
        }
    }

    async register(credentials: RegisterCredentials): Promise<AuthUser> {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
        )

        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
        }
    }

    async logout(): Promise<void> {
        await firebaseSignOut(auth)
    }

    async resetPassword(email: string): Promise<void> {
        await sendPasswordResetEmail(auth, email)
    }
}
