//Import Third Party lib
import { indexApi } from '@docAi-app/api';
import { Button } from '../../stories/components/Button/Button.component';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

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
import Styles from './InviteToBrain.module.scss';
import { useState } from 'react';

const InviteToBrain = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [brainName, setBrainName] = useState<string>('');
    const { state } = location;
    useState(() => {
        if (state) {
            const { indexUuid } = state;

            if (indexUuid) {
                indexApi.getIndex({ index_uuid: indexUuid }).then((res) => {
                    setBrainName(res.payload.title);
                });
            }
        }
    }, []);

    const handleClick = (status: boolean) => {
        if (state) {
            const { indexUuid, token, userUuid } = state;

            if (indexUuid && token && userUuid) {
                indexApi
                    .addIndexUser({
                        status: status ? 1 : 2,
                        index_uuid: indexUuid,
                        token: token,
                        user_uuid: userUuid,
                    })
                    .then(() => {
                        navigate(`${ROUTE.ROOT}${ROUTE.HOME}`);
                    });
            } else {
                navigate(`${ROUTE.ROOT}${ROUTE.HOME}`);
            }
        }
    };

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.container}>
                <div>
                    <h4 className={Styles.container__title}>Invitation To Join {brainName}</h4>
                </div>

                <div>
                    <div className={Styles.container__content}>
                        <p>
                            You have been invited to {brainName}. Please accept the invite to start your exciting
                            journey with
                            {brainName}
                        </p>
                    </div>
                    <div className={Styles.container__actionButton}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClick(true);
                            }}
                        >
                            Yes , Let's Dive in!
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleClick(false);
                            }}
                        >
                            No , I'm better
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { InviteToBrain };
