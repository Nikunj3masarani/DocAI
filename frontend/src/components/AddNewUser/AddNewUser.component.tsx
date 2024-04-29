//Import Third Party lib
import { Field, Form } from 'react-final-form';

//Import Storybook
import { Button, InputChips } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { EMAIL_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { validation } from '@docAi-app/utils/helper';

//Import Icon

//Import Api
import { authApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './AddNewUser.module.scss';

interface AddNewUserProps {
    handleClose: () => void;
}

const AddNewUser = ({ handleClose }: AddNewUserProps) => {
    // Your component logic here
    const handleSubmit = async (formValues: { email: string[] }) => {
        let isApiFailed = false;
        for (let i = 0; i < formValues.email.length; i++) {
            const emailId = formValues.email[i];
            await authApi.inviteUsers({ email: emailId }).catch(() => {
                isApiFailed = true;
            });
        }

        return isApiFailed ? Promise.reject(-1) : Promise.resolve();
    };

    return (
        <div className={Styles.container}>
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit, form, values, submitting }) => {
                    return (
                        <div>
                            <form
                                onSubmit={(v) => {
                                    handleSubmit(v)?.then(() => {
                                        handleClose();
                                        form.restart();
                                    });
                                }}
                                className={Styles.formContainer}
                            >
                                <div className={Styles.formContainer__field}>
                                    <div className={Styles.formContainer__userInfo}>
                                        <Field
                                            name="email"
                                            render={({ input }) => {
                                                return (
                                                    <InputChips
                                                        {...input}
                                                        fullWidth
                                                        maxWidth="unset"
                                                        placeholder="Enter Email To Add New User"
                                                        validate={(chipValue) => {
                                                            return {
                                                                isError:
                                                                    chipValue.length === 0
                                                                        ? false
                                                                        : validation(
                                                                              { regex: EMAIL_VALIDATION.regex },
                                                                              chipValue,
                                                                          ).length > 0,
                                                                textError: EMAIL_VALIDATION.regex!.message,
                                                            };
                                                        }}
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
                                        disabled={!values['email'] || values['email'].length === 0 || submitting}
                                    >
                                        Done
                                    </Button>
                                </div>
                            </form>
                        </div>
                    );
                }}
            />
        </div>
    );
};

export { AddNewUser };
