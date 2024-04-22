//Import Third Party lib

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style
import Styles from './UsersWithAccess.module.scss';
import { Field, Form } from 'react-final-form';
import { Button, IconButton, InputField, Select } from '@docAi-app/stories';
import { USER_ROLE } from '@docAi-app/utils/constants/common.constant';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import Icons from '@docAi-app/icons';
import { useEffect, useState } from 'react';
import { indexApi } from '@docAi-app/api';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

export interface Users {
    email: string;
    role: number;
    userId: string;
}

interface UsersWithAccessProps {
    initialUserList: Users[];
    currentUser: Users;
}
const UsersWithAccess = ({ initialUserList, currentUser }: UsersWithAccessProps) => {
    // useRef
    // useState
    // Variables Dependent upon State
    const [userList, setUserList] = useState<Users[]>([]);
    const disableForm = currentUser.role !== USER_ROLE['owner'].value;
    // Api Calls

    // Event Handlers
    useEffect(() => {
        setUserList(initialUserList);
    }, [initialUserList]);
    // Helpers
    // const params = useParams();
    // useEffect(() => {
    //     const indexUuid = params[ROUTE.INDEX_ID];
    //     if (indexUuid) {
    //         indexApi.getIndexUsers({ index_uuid: indexUuid }).then((res) => {
    //             const payload = res.payload;
    //             const tempUserList: Users[] = [];
    //             payload.map((user) => {
    //                 const { role, email, user_uuid } = user;
    //                 tempUserList?.push({ email, role, userId: user_uuid });
    //             });
    //             setUserList(tempUserList);
    //         });
    //     }
    // }, []);
    // JSX Methods

    // Your component logic here

    const handleSubmit = (v) => {
    };
    const validate = (v) => {
        const users: Users[] = v['users'];
        let numberofOwner = 0;

        users.forEach((user) => {
            if (user.role === 1) numberofOwner++;
        });
        const error = [];
        if (numberofOwner <= 1) error.push("Owner can't be zero");
        return error.length !== 0 ? error : undefined;
    };
    return (
        <div className={Styles.container}>
            <h3 className={Styles.container__title}>Users With Access</h3>
            <Form
                onSubmit={handleSubmit}
                mutators={{
                    ...arrayMutators,
                }}
                initialValues={{
                    users: userList,
                }}
                validate={validate}
                render={({ handleSubmit, pristine, invalid }) => {
                    return (
                        <div>
                            <form onSubmit={handleSubmit} className={Styles.formContainer}>
                                <FieldArray name="users">
                                    {({ fields }) => {
                                        return fields.map((name, index) => {
                                            return (
                                                <div className={Styles.formContainer__field}>
                                                    <div className={Styles.formContainer__userInfo}>
                                                        <div className={Styles.formContainer__deleteBtn}>
                                                            <IconButton
                                                                disabled={disableForm}
                                                                onClick={() => {
                                                                    const users = fields.value;
                                                                    if (
                                                                        users &&
                                                                        currentUser.email !== users[index].email
                                                                    ) {
                                                                        const indexUuid = params[ROUTE.INDEX_ID];
                                                                        // if(indexUuid)
                                                                        indexApi.removeIndexUser({index_uuid : indexUuid , remove_user_uuid : users[index].userId })
                                                                        fields.remove(index);
                                                                    }
                                                                }}
                                                            >
                                                                <Icons.Delete />
                                                            </IconButton>
                                                        </div>
                                                        <Field
                                                            name={`${name}.email`}
                                                            render={({ input, meta }) => {
                                                                return (
                                                                    <InputField
                                                                        disabled
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
                                                                        disabled={disableForm}
                                                                        variant="outlined"
                                                                        {...input}
                                                                        options={Object.keys(USER_ROLE).map(
                                                                            (key: keyof typeof USER_ROLE) => {
                                                                                const { label, value } = USER_ROLE[key];
                                                                                return {
                                                                                    label,
                                                                                    value,
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
                                        type="submit"
                                        variant="contained"
                                        disabled={
                                            invalid || (pristine && currentUser.role !== USER_ROLE['owner'].value)
                                        }
                                    >
                                        Update
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

export { UsersWithAccess };
