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

const ForgotPassword = () => {
    // useRef
    // useState
    const navigate = useNavigate();
    // Variables Dependent upon State
    const formControls = ['email'] as const;

    type FieldValidation = {
        [P in (typeof formControls)[number]]: Partial<Validation>;
    };

    const fieldValidation: FieldValidation = {
        email: EMAIL_VALIDATION,
    };
    // Api Calls

    // Event Handlers
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

    const handleSubmit = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        authApi
            .forgotPassword({ email: val['email'] })
            .then(() => {
                navigate(`${ROUTE.ROOT}${ROUTE.AUTH}/${ROUTE.LOGIN}`);
            })
            .catch(() => {
                console.log('Error while forgot password');
            });
    };

    // Your component logic here

    return (
        <div className={Styles.container}>
            <h2 className={Styles.title}>Enter Registered Email</h2>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit }) => {
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
                                                    error={meta.touched && meta.error}
                                                    helperText={meta.touched && meta.error && <span>{meta.error}</span>}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={Styles.actionButton}>
                                <Button type="submit" variant="contained" color="primary" onClick={() => { }}>
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
            ></Form>
        </div>
    );
};

export { ForgotPassword };
