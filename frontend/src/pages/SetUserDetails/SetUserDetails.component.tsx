//Import Third Party lib
import { useLocation, useNavigate } from 'react-router-dom';
import { Field, Form } from 'react-final-form';

//Import Storybook
import { Button, InputField } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { removeEmptyField, validation } from '@docAi-app/utils/helper';
import { PASSWORD_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { Validation } from '@docAi-app/types';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

//Import Icon

//Import Api
import { authApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './SetUserDetails.module.scss';
import { useRef } from 'react';
import { FormApi } from 'final-form';

const SetUserDetails = () => {
    // useRef
    // useState
    const navigate = useNavigate();
    const location = useLocation();
    const formRef =
        useRef<FormApi<{ fullName: string; password: string }, Partial<{ fullName: string; password: string }>>>();
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here

    const formControls = ['fullName', 'password'] as const;

    type FieldValidation = {
        [P in (typeof formControls)[number]]: Partial<Validation>;
    };

    const fieldValidation: FieldValidation = {
        fullName: { required: { message: 'Full Name is required' } },
        password: PASSWORD_VALIDATION,
    };

    const validate = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        const errors = {
            fullName: '',
            password: '',
        };
        formControls.forEach((controlName) => {
            switch (controlName) {
                case 'fullName': {
                    errors['fullName'] = validation(fieldValidation['fullName'], val['fullName']);
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

    const handleSubmit = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        const { state } = location;
        if (state['userUuid'] && state['token']) {
            authApi
                .setPasswords({
                    full_name: val['fullName'],
                    password: val['password'],
                    user_uuid: state['userUuid'],
                    token: state['token'],
                    action: 1,
                })
                .then(() => {
                    navigate(`${ROUTE.ROOT}${ROUTE.AUTH}/${ROUTE.LOGIN}`);
                });
        }
    };

    return (
        <div className={Styles.container}>
            <h2 className="center">Enter User Details</h2>
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
                                        name="fullName"
                                        render={({ input, meta }) => {
                                            return (
                                                <InputField
                                                    {...input}
                                                    type="text"
                                                    fullWidth
                                                    label="Full Name"
                                                    placeholder="Enter Your Full Name"
                                                    required
                                                    error={(meta.touched && meta.error && true) || submitFailed}
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
                                                    error={meta.touched && meta.error && true}
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
                                    Update Details
                                </Button>
                            </div>
                        </form>
                    );
                }}
            ></Form>
        </div>
    );
};

export { SetUserDetails };
