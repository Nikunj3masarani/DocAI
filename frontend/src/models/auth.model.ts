interface LoginRequestBody {
    email: string;
    password: string;
}

interface LoginResponsePayload {
    token: string;
}

interface ForgotPasswordRequestBody {
    email: string;
}

export type { LoginRequestBody, ForgotPasswordRequestBody, LoginResponsePayload };
