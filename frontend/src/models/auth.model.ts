interface LoginRequestBody {
    email: string;
    password: string;
}

interface OAuthLoginRequestBody {
    access_token: string;
}

interface LoginResponsePayload {
    token: string;
    user_uuid: string;
}

interface ForgotPasswordRequestBody {
    email: string;
}

interface InviteUserRequestBody {
    email: string;
    action?: number;
}

interface SetPassWordsRequestBody {
    user_uuid: string;
    full_name?: string;
    password: string;
    token: string;
    action: number;
}

export type {
    LoginRequestBody,
    ForgotPasswordRequestBody,
    LoginResponsePayload,
    InviteUserRequestBody,
    SetPassWordsRequestBody,
    OAuthLoginRequestBody,
};
