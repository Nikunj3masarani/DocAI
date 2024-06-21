//Import Third Party lib
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useParams } from 'react-router-dom';

//Import Storybook
import { AsyncSearchSelect, Button, IconButton, Select } from '@docAi-app/stories';

//Import Component
import { Users } from '../UsersWithAccess/UsersWithAccess.component';
//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { USER_ROLE } from '@docAi-app/utils/constants/common.constant';
import { EMAIL_VALIDATION } from '@docAi-app/utils/constants/validation.constant';
import { validation } from '@docAi-app/utils/helper';

//Import Icon
import Icons from '@docAi-app/icons';

//Import Api
import { indexApi } from '@docAi-app/api';

//Import Assets

//Import Style
import { UserListResponseBody, UserListSelectType } from '@docAi-app/models/index.model';
import Styles from './InvitePeople.module.scss';

const fieldInitialValue = {
    email: '',
    role: 3,
};

interface InvitePeopleProps {
    peopleInvited: () => void;
}
const InvitePeople = ({ peopleInvited }: InvitePeopleProps) => {
    const params = useParams();

    const loadOptions = async (searchString: string) => {
        const res = await indexApi.searchUser({ search: searchString || '' });

        const options: UserListSelectType[] = res.payload.users.map((item: UserListResponseBody) => {
            return {
                value: item.user_uuid,
                label: item.email,
            };
        });

        return {
            options: options.length === 0 ? [] : options,
            hasMore: false,
        };
    };

    // Your component logic here
    const handleSubmit = (formValues: { users: Users[] }) => {
        const users = formValues['users'];
        const indexUuid = params[ROUTE.INDEX_ID];
        if (indexUuid) {
            users.forEach((user) => {
                indexApi
                    .inviteIndexUser({ index_uuid: indexUuid, user_uuid: user.email.value, role: user.role })
                    .then(() => {
                        peopleInvited();
                    });
            });
        }
    };

    const fieldValidator = (v: string) => {
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
                                    form.restart();
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
                                                                    <AsyncSearchSelect
                                                                        variant="transparent"
                                                                        {...input}
                                                                        placeholder="Enter Email To Invite"
                                                                        menuPlacement="auto"
                                                                        debounceTimeout={1000}
                                                                        loadOptions={loadOptions}
                                                                        defaultValue={null}
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
