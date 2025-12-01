// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAuthErrorMessage(error: any): string {
    // Extract the error code or message from various possible locations
    let errorCode = '';

    if (typeof error === 'string') {
        errorCode = error;
    } else if (error?.code) {
        errorCode = error.code;
    } else if (error?.message) {
        errorCode = error.message;
    } else if (error?.error?.message) {
        // Handle raw API error structure: { error: { message: "EMAIL_EXISTS" } }
        errorCode = error.error.message;
    } else if (error?.error?.code) {
        errorCode = error.error.code;
    }

    // Handle raw API errors
    if (errorCode?.includes('EMAIL_EXISTS')) return 'Este e-mail já está em uso.';
    if (errorCode?.includes('INVALID_PASSWORD')) return 'Senha incorreta.';
    if (errorCode?.includes('EMAIL_NOT_FOUND')) return 'E-mail não encontrado.';
    if (errorCode?.includes('USER_DISABLED')) return 'Usuário desativado.';
    if (errorCode?.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) return 'Muitas tentativas. Tente novamente mais tarde.';

    // Handle Firebase SDK errors
    switch (errorCode) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
        case 'auth/invalid-email':
            return 'E-mail ou senha incorretos.';
        case 'auth/email-already-in-use':
            return 'Este e-mail já está em uso.';
        case 'auth/weak-password':
            return 'A senha é muito fraca.';
        case 'auth/operation-not-allowed':
            return 'Operação não permitida.';
        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';
        case 'auth/network-request-failed':
            return 'Erro de conexão. Verifique sua internet.';
        case 'auth/popup-closed-by-user':
            return 'O login foi cancelado.';
        default:
            return 'Ocorreu um erro inesperado. Tente novamente.';
    }
}
