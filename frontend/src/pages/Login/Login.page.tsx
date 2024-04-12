//Import Third Party lib
import { useNavigate } from 'react-router-dom';
import { Field, Form } from 'react-final-form';

//Import Storybook
import { Button, InputField } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { removeEmptyField, validation } from '@docAi-app/utils/helper/validation.helper';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { Validation } from '@docAi-app/types/validation.type';

//Import Icon

//Import Api

//Import Assets

//Import Style
import Styles from './Login.module.scss';
import { authApi } from '@docAi-app/api';
import { setToLocalStorage } from '@docAi-app/utils/helper/storage.helper';
import { ACCESS_TOKEN_KEY, CURRENT_USER_EMAIL } from '@docAi-app/utils/constants/storage.constant';
import { useAuth } from '@docAi-app/hooks';

const Login = () => {
    // useRef
    // useState
    const navigate = useNavigate();
    const auth = useAuth();

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

    const handleSubmit = (val: {
        [P in (typeof formControls)[number]]: string;
    }) => {
        authApi.login(val).then((res) => {
            const token = res.payload.token;
            setToLocalStorage(ACCESS_TOKEN_KEY, token);
            setToLocalStorage(CURRENT_USER_EMAIL, val['email']);
            auth.setIsLogin(true);
            navigate(`${ROUTE.ROOT}`);
        });
    };

    return (
        <div className={Styles.container}>
            <h2 className="center">Enter Login Details</h2>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
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
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
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
                                                    meta.touched &&
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div className={Styles.actionButton}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => {
                                    navigate(`/${ROUTE.AUTH}/${ROUTE.FORGOT_PASSWORD}`);
                                }}
                            >
                                Forgot Password?
                            </Button>

                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </div>
                    </form>
                )}
            ></Form>
        </div>
    );
};

export { Login };