//Import Third Party lib
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';
import { InputField, Select } from '@docAi-app/stories';
import { Button } from '@docAi-app/stories';
import { IconButton } from '@docAi-app/stories';
//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import Icons from '@docAi-app/icons';
import arrayMutators from 'final-form-arrays';

//Import Api

//Import Assets

//Import Style
import Styles from './InvitePeople.module.scss';
import { validation } from '@docAi-app/utils/helper/validation.helper';
import { EMAIL_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { USER_ROLE } from '@docAi-app/utils/constants/common.constant';
import { useParams } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { indexApi } from '@docAi-app/api';
import { Users } from '../UsersWithAccess/UsersWithAccess.component';

const fieldInitialValue = {
    email: '',
    role: 3,
};

interface InvitePeopleProps {
    peopleInvited: () => void;
}
const InvitePeople = ({ peopleInvited }: InvitePeopleProps) => {
    // useRef
    // useState
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods
    const params = useParams();
    // Your component logic here
    const handleSubmit = (formValues: { users: Users[] }) => {
        const users = formValues['users'];
        const indexUuid = params[ROUTE.INDEX_ID];
        if (indexUuid) {
            users.forEach((user) => {
                indexApi.inviteIndexUser({ index_uuid: indexUuid, email: user.email, role: user.role }).then(() => {
                    peopleInvited();
                });
            });
        }
    };

    const fieldValidator = (v) => {
        return validation(EMAIL_VALIDATION, v) ?? undefined;
    };

    return (
        <div className={Styles.container}>
            <h3 className={Styles.container__title}>Invite New Users</h3>
            <Form
                onSubmit={handleSubmit}
                mutators={{
                    ...arrayMutators,
                }}
                initialValues={{
                    users: [fieldInitialValue],
                }}
                render={({
                    handleSubmit,
                    form: {
                        mutators: { push },
                    },
                    invalid,
                    form,
                }) => {
                    return (
                        <div>
                            <form
                                onSubmit={(v) => {
                                    handleSubmit(v);
                                    form.reset();
                                }}
                                className={Styles.formContainer}
                            >
                                <FieldArray name="users">
                                    {({ fields }) => {
                                        return fields.map((name, index) => {
                                            return (
                                                <div className={Styles.formContainer__field}>
                                                    <div className={Styles.formContainer__userInfo}>
                                                        <div className={Styles.formContainer__deleteBtn}>
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (fields.length && fields.length > 1) {
                                                                        fields.remove(index);
                                                                    }
                                                                }}
                                                            >
                                                                <Icons.Delete />
                                                            </IconButton>
                                                        </div>
                                                        <Field
                                                            validate={fieldValidator}
                                                            name={`${name}.email`}
                                                            render={({ input, meta }) => {
                                                                return (
                                                                    <InputField
                                                                        {...input}
                                                                        type="email"
                                                                        fullWidth
                                                                        placeholder="Enter Email To Invite"
                                                                        required
                                                                        error={meta.touched && meta.error && true}
                                                                        helperText={
                                                                            meta.touched &&
                                                                            meta.error && (
                                                                                <span style={{ width: '100%' }}>
                                                                                    {meta.error}
                                                                                </span>
                                                                            )
                                                                        }
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={Styles.formContainer__roleSelector}>
                                                        <Field
                                                            name={`${name}.role`}
                                                            render={({ input }) => {
                                                                return (
                                                                    <Select
                                                                        variant="outlined"
                                                                        {...input}
                                                                        options={Object.keys(USER_ROLE).map(
                                                                            (key: keyof typeof USER_ROLE) => {
                                                                                const { label, value } = USER_ROLE[key];
                                                                                return {
                                                                                    label: label,
                                                                                    value: value,
                                                                                };
                                                                            },
                                                                        )}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        });
                                    }}
                                </FieldArray>
                                <div className={Styles.actionButton}>
                                    <Button
                                        type="button"
                                        disabled={invalid}
                                        onClick={() => {
                                            push('users', fieldInitialValue);
                                        }}
                                        variant="outlined"
                                    >
                                        Add new user
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={invalid}>
                                        Invite
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

export { InvitePeople };