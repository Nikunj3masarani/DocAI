//Import Third Party lib

import { useEffect, useState } from 'react';
import { InvitePeople } from '../InvitePeople';
import { UsersWithAccess } from '../UsersWithAccess';

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
import Styles from './People.module.scss';
import { useParams } from 'react-router-dom';
import { indexApi } from '@docAi-app/api';
import { Users } from '../UsersWithAccess/UsersWithAccess.component';
import { getFromLocalStorage } from '@docAi-app/utils/helper/storage.helper';
import { CURRENT_USER_EMAIL } from '@docAi-app/utils/constants/storage.constant';
import { USER_ROLE } from '@docAi-app/utils/constants/common.constant';

const People = () => {
    // useRef
    // useState
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here
    const [userList, setUserList] = useState<Users[]>([]);
    const [currentUser, setCurrentUser] = useState<Users>({ email: '', role: 1, userId: '' });
    const [needToUpdateUserList, setNeedToUpdateUserList] = useState<boolean>(false);

    const params = useParams();
    useEffect(() => {
        const indexUuid = params['index-id'];
        if (indexUuid) {
            indexApi.getIndexUsers({ index_uuid: indexUuid }).then((res) => {
                const payload = res.payload;
                const tempUserList: Users[] = [];
                const currentUserEmail = getFromLocalStorage(CURRENT_USER_EMAIL);

                payload.map((user) => {
                    const { role, email, user_uuid } = user;
                    if (email === currentUserEmail) {
                        setCurrentUser({ email, role, userId: user_uuid });
                    }

                    tempUserList?.push({ email, role, userId: user_uuid });
                });

                setUserList(tempUserList);
            });
        }
    }, [needToUpdateUserList]);
    return (
        <div className={Styles.container}>
            {currentUser?.role === USER_ROLE['owner'].value ? (
                <div className={Styles.childComponents}>
                    <InvitePeople peopleInvited={() => setNeedToUpdateUserList((prev) => !prev)} />
                </div>
            ) : null}
            <div className={Styles.childComponents}>
                <UsersWithAccess initialUserList={userList} currentUser={currentUser} />
            </div>
        </div>
    );
};

export { People };
