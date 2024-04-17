//Import Third Party lib
import { Form, Field } from 'react-final-form';

//Import Storybook
import { Button, InputField } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Validation } from '@docAi-app/types/validation.type';

//Import Util, Helper , Constant
import { removeEmptyField, validation } from '@docAi-app/utils/helper/validation.helper';
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from '@docAi-app/utils/constants/validation.constant';

//Import Style
import Styles from './ResetPassword.module.scss';

const ResetPassword = () => {
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
                    if (errors['confirmPassword'] === '') {
                        errors['confirmPassword'] =
                            val['password'] === val['confirmPassword']
                                ? ''
                                : fieldValidation['confirmPassword'].custom?.message ?? '';
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

    const handleSubmit = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
    };

    return (
        <div className={Styles.container}>
            <h2 className="center">Enter New Password</h2>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit }) => {
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
                                                    error={meta.touched && meta.error}
                                                    helperText={meta.touched && meta.error && <span>{meta.error}</span>}
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
                                <Button type="submit" variant="contained" color="primary" onClick={() => {}}>
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
