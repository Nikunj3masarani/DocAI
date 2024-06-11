import {
    ForgotPasswordRequestBody,
    InviteUserRequestBody,
    LoginRequestBody,
    LoginResponsePayload,
    OAuthLoginRequestBody,
    SetPassWordsRequestBody,
} from '@docAi-app/models';
import { ApiConfig } from '@docAi-app/types';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { Method } from 'axios';

const login = (requestBody: LoginRequestBody) => {
    const data: ApiConfig<LoginRequestBody> = {
        method: ENDPOINTS.AUTH.LOGIN.METHOD as Method,
        url: ENDPOINTS.AUTH.LOGIN.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall<LoginResponsePayload, LoginRequestBody>(data);
};

const oAuthLogin = (requestBody: OAuthLoginRequestBody) => {
    const data: ApiConfig<OAuthLoginRequestBody> = {
        method: ENDPOINTS.AUTH.OAUTH_LOGIN.METHOD as Method,
        url: ENDPOINTS.AUTH.OAUTH_LOGIN.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall<LoginResponsePayload, OAuthLoginRequestBody>(data);
};

const forgotPassword = (requestBody: ForgotPasswordRequestBody) => {
    const data: ApiConfig<ForgotPasswordRequestBody> = {
        method: ENDPOINTS.AUTH.FORGOT_PASSWORD.METHOD as Method,
        url: ENDPOINTS.AUTH.FORGOT_PASSWORD.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall(data);
};

const inviteUsers = (requestBody: InviteUserRequestBody) => {
    const data: ApiConfig<InviteUserRequestBody> = {
        method: ENDPOINTS.AUTH.INVITE_USER.METHOD as Method,
        url: ENDPOINTS.AUTH.INVITE_USER.URL,
        data: { ...requestBody, action: 1 },
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall(data);
};

const setPasswords = (requestBody: SetPassWordsRequestBody) => {
    const data: ApiConfig<SetPassWordsRequestBody> = {
        method: ENDPOINTS.AUTH.SET_PASSWORDS.METHOD as Method,
        url: ENDPOINTS.AUTH.SET_PASSWORDS.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall(data);
};

const authApi = {
    login,
    forgotPassword,
    inviteUsers,
    setPasswords,
    oAuthLogin,
};

export { authApi };
