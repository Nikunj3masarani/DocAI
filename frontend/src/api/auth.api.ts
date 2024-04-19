import { Method } from 'axios';
import { ApiConfig } from '@docAi-app/types';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { ForgotPasswordRequestBody, LoginRequestBody, LoginResponsePayload } from '@docAi-app/models';

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

const authApi = {
    login,
    forgotPassword,
};

export { authApi };
