//Import Third Party lib
import { FORM_ERROR, FormApi } from 'final-form';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

//Import Storybook
import { Button, InputField } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Validation } from '@docAi-app/types';

//Import Util, Helper , Constant
import { removeEmptyField, validation } from '@docAi-app/utils/helper';
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

//Import Icon

//Import Api
import { authApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './ResetPassword.module.scss';

const ResetPassword = () => {
    const formRef =
        useRef<
            FormApi<
                { password: string; confirmPassword: string },
                Partial<{ password: string; confirmPassword: string }>
            >
        >();

    const navigate = useNavigate();
    const location = useLocation();

    const formControls = ['password', 'confirmPassword'] as const;

    type FieldValidation = {
        [P in (typeof formControls)[number]]: Partial<Validation>;
    };

    const fieldValidation: FieldValidation = {
        password: PASSWORD_VALIDATION,
        confirmPassword: CONFIRM_PASSWORD_VALIDATION,
    };

    const validate = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        const errors = {
            password: '',
            confirmPassword: '',
        };
        formControls.forEach((controlName) => {
            switch (controlName) {
                case 'password': {
                    errors['password'] = validation(fieldValidation['password'], val['password']);
                    break;
                }
                case 'confirmPassword': {
                    errors['confirmPassword'] = validation(fieldValidation['confirmPassword'], val['confirmPassword']);
                    if (errors['confirmPassword'].length === 0) {
                        errors['confirmPassword'] =
                            val['password'] === val['confirmPassword']
                                ? ''
                                : 'Confirm Password and Password are not same';
                    }
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
        const { state } = location;
        if (state && state['userUuid'] && state['token']) {
            const result = await authApi
                .setPasswords({
                    password: val['password'],
                    user_uuid: state['userUuid'],
                    token: state['token'],
                    action: 3,
                })
                .then(() => {
                    navigate(`${ROUTE.ROOT}${ROUTE.AUTH}/${ROUTE.LOGIN}`);
                })
                .catch((error) => {
                    return {
                        message: error.message,
                    };
                });

            if (result && result.message) {
                return { [FORM_ERROR]: result.message };
            }
        }
    };

    return (
        <div className={Styles.container}>
            <h2 className="center">Enter New Password</h2>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({
                    handleSubmit,
                    hasValidationErrors,
                    dirty,
                    submitting,
                    form,
                    submitFailed,
                    hasSubmitErrors,
                    submitError,
                }) => {
                    formRef.current = form;

                    return (
                        <form className={Styles.formContainer} onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <Field
                                        name="password"
                                        render={({ input, meta }) => {
                                            return (
                                                <InputField
                                                    label="Password"
                                                    {...input}
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    required
                                                    fullWidth
                                                    error={(meta.touched && meta.error) || submitFailed}
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
                            <div>
                                <div>
                                    <Field
                                        name="confirmPassword"
                                        render={({ input, meta }) => {
                                            return (
                                                <InputField
                                                    label="Confirm Password"
                                                    {...input}
                                                    fullWidth
                                                    placeholder="Enter Confirm Password"
                                                    type="password"
                                                    required
                                                    error={meta.touched && meta.error}
                                                    helperText={meta.touched && meta.error && <span>{meta.error}</span>}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={Styles.actionButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={hasValidationErrors || !dirty || submitting}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    );
                }}
            ></Form>
        </div>
    );
};

export { ResetPassword };
