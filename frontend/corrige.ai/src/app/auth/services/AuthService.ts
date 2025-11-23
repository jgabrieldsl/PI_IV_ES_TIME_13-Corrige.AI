import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "@/shared/lib/firebase"
import type { LoginCredentials, SignupCredentials, AuthUser } from "../models"

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

    async signup(credentials: SignupCredentials): Promise<AuthUser> {
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
}
