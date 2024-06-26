//Import Third Party lib
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

//Import Storybook
import { Button, InputField } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { Validation } from '@docAi-app/types';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { removeEmptyField, validation } from '@docAi-app/utils/helper';

//Import Icon

//Import Api

//Import Assets

//Import Style
import { authApi } from '@docAi-app/api';
import { useAuth } from '@docAi-app/hooks';
import { ACCESS_TOKEN_KEY, CURRENT_USER_EMAIL, USER_UUID } from '@docAi-app/utils/constants/storage.constant';
import { setToLocalStorage } from '@docAi-app/utils/helper';
import { FORM_ERROR, FormApi } from 'final-form';
import { useEffect, useRef } from 'react';
import Styles from './Login.module.scss';

const Login = () => {
    // useRef
    const formRef =
        useRef<FormApi<{ email: string; password: string }, Partial<{ email: string; password: string }>>>();
    // useState
    const navigate = useNavigate();
    const { setIsLogin } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            handleOAuthLogin(code);
        }
    }, []);

    const handleOAuthLogin = (code: string) => {
        authApi
            .oAuthLogin({
                access_token: code,
            })
            .then((res) => {
                const token = res.payload.token;
                setToLocalStorage(ACCESS_TOKEN_KEY, token);
                setToLocalStorage(USER_UUID, res.payload.user_uuid);
                setIsLogin(true);
                navigate(`${ROUTE.ROOT}${ROUTE.AUTH}`);
            })
            .catch((error) => {
                return error;
            });
    };

    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here

    const formControls = ['email', 'password'] as const;

    type FieldValidation = {
        [P in (typeof formControls)[number]]: Partial<Validation>;
    };

    const fieldValidation: FieldValidation = {
        email: EMAIL_VALIDATION,
        password: PASSWORD_VALIDATION,
    };

    const validate = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        const errors = {
            email: '',
            password: '',
        };
        formControls.forEach((controlName) => {
            switch (controlName) {
                case 'email': {
                    errors['email'] = validation(fieldValidation['email'], val['email']);
                    break;
                }
                case 'password': {
                    errors['password'] = validation(fieldValidation['password'], val['password']);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        const errorObject = removeEmptyField(errors) as object;
        return Object.keys(errorObject).length > 0 ? errorObject : {};
    };

    const handleSubmit = async (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        let isError = false;
        const res = await authApi
            .login(val)
            .then((res) => {
                const token = res.payload.token;
                setToLocalStorage(ACCESS_TOKEN_KEY, token);
                setToLocalStorage(CURRENT_USER_EMAIL, val['email']);
                setToLocalStorage(USER_UUID, res.payload.user_uuid);
                setIsLogin(true);
                navigate(`${ROUTE.ROOT}${ROUTE.AUTH}`);
            })
            .catch((error) => {
                isError = true;
                return error;
            });

        if (formRef.current) {
            formRef.current.restart(val);
        }
        if (isError) {
            return { [FORM_ERROR]: res.message };
        }
    };

    const handleLogin = async () => {
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URL);
        const scope = encodeURIComponent('openid profile email');
        const tenant_id = import.meta.env.VITE_TENANT_ID;

        const authorizationUrl = `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

        window.location.href = authorizationUrl;
    };

    return (
        <div className={Styles.container}>
            <h2 className="center">Enter Login Details</h2>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({
                    handleSubmit,
                    submitting,
                    dirty,
                    submitFailed,
                    form,
                    hasValidationErrors,
                    hasSubmitErrors,
                    submitError,
                }) => {
                    formRef.current = form;
                    return (
                        <form onSubmit={handleSubmit} className={Styles.formContainer}>
                            <div>
                                <div>
                                    <Field
                                        name="email"
                                        render={({ input, meta }) => {
                                            return (
                                                <InputField
                                                    {...input}
                                                    type="email"
                                                    fullWidth
                                                    label="Email"
                                                    placeholder="Enter Email"
                                                    required
                                                    error={meta.touched && meta.error && true}
                                                    helperText={
                                                        meta.touched &&
                                                        meta.error && (
                                                            <span style={{ width: '100%' }}>{meta.error}</span>
                                                        )
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Field
                                        name="password"
                                        render={({ input, meta }) => {
                                            return (
                                                <InputField
                                                    label="Password"
                                                    type="password"
                                                    fullWidth
                                                    {...input}
                                                    placeholder="Enter Password"
                                                    required
                                                    error={(meta.touched && meta.error && true) || submitFailed}
                                                    helperText={
                                                        (meta.touched && meta.error && (
                                                            <span style={{ width: '100%' }}>{meta.error}</span>
                                                        )) ||
                                                        (!dirty && hasSubmitErrors && (
                                                            <span style={{ width: '100%' }}>{submitError}</span>
                                                        ))
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={Styles.actionButton}>
                                {/* <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => {
                                        navigate(`/${ROUTE.AUTH}/${ROUTE.FORGOT_PASSWORD}`);
                                    }}
                                >
                                    Forgot Password?
                                </Button> */}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={hasValidationErrors || !dirty || submitting}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    );
                }}
            ></Form>
            <div>
                <Button type="button" className={Styles.microsoftLogin} variant="contained" onClick={handleLogin}>
                    Login with BASF
                </Button>
            </div>
        </div>
    );
};

export { Login };
