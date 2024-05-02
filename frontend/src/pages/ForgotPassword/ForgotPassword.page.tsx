//Import Third Party lib
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';

//Import Storybook
import { Button, InputField } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Validation } from '@docAi-app/types';

//Import Util, Helper , Constant
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { EMAIL_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { removeEmptyField, validation } from '@docAi-app/utils/helper';

//Import Icon

//Import Api

//Import Assets

//Import Style
import Styles from './ForgotPassword.module.scss';
import { authApi } from '@docAi-app/api';
import { useRef } from 'react';
import { FormApi } from 'final-form';

const ForgotPassword = () => {
    const formRef = useRef<FormApi<{ email: string }, Partial<{ email: string }>>>();
    const navigate = useNavigate();
    const formControls = ['email'] as const;

    type FieldValidation = {
        [P in (typeof formControls)[number]]: Partial<Validation>;
    };

    const fieldValidation: FieldValidation = {
        email: EMAIL_VALIDATION,
    };

    const validate = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        const errors = {
            email: '',
        };
        formControls.forEach((controlName) => {
            switch (controlName) {
                case 'email': {
                    errors['email'] = validation(fieldValidation['email'], val['email']);
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
        const isSuccess = await authApi
            .forgotPassword({ email: val['email'] })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });

        if (isSuccess) {
            navigate(`${ROUTE.ROOT}${ROUTE.AUTH}/${ROUTE.LOGIN}`);
        } else {
            if (formRef.current) {
                formRef.current.restart(val);
            }
            return { [FORM_ERROR]: 'User Not Found' };
        }
    };

    // Your component logic here

    return (
        <div className={Styles.container}>
            <h2 className={Styles.title}>Enter Registered Email</h2>
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
                                        name="email"
                                        render={({ input, meta }) => {
                                            return (
                                                <InputField
                                                    {...input}
                                                    label="Email"
                                                    placeholder="Enter Email"
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

                            <div className={Styles.actionButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={hasValidationErrors || !dirty || submitting}
                                >
                                    Reset Password
                                </Button>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => {
                                        navigate(`${ROUTE.ROOT}`);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export { ForgotPassword };
