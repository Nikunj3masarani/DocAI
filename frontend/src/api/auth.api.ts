import { Method } from 'axios';
import { ApiConfig } from '@docAi-app/types';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import {
    ForgotPasswordRequestBody,
    InviteUserRequestBody,
    LoginRequestBody,
    LoginResponsePayload,
    SetPassWordsRequestBody,
} from '@docAi-app/models';

const login = (requestBody: LoginRequestBody) => {
    const data: ApiConfig<LoginRequestBody> = {
        method: ENDPOINTS.AUTH.LOGIN.METHOD as Method,
        url: ENDPOINTS.AUTH.LOGIN.URL,
        data: requestBody,
    };

    return apiCall<LoginResponsePayload, LoginRequestBody>(data);
};

const forgotPassword = (requestBody: ForgotPasswordRequestBody) => {
    const data: ApiConfig<ForgotPasswordRequestBody> = {
        method: ENDPOINTS.AUTH.FORGOT_PASSWORD.METHOD as Method,
        url: ENDPOINTS.AUTH.FORGOT_PASSWORD.URL,
        data: requestBody,
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
    };

    return apiCall(data);
};

const authApi = {
    login,
    forgotPassword,
    inviteUsers,
    setPasswords,
};

export { authApi };
