//Import Third Party lib
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Import Storybook
import { Dialog } from '@docAi-app/stories';

//Import Component
import { AddUpdateKnowledge, CreateUpdateBrain, MessageTypeField, PageHeader } from '@docAi-app/components';

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { HeaderAction } from '@docAi-app/types';

//Import Util, Helper , Constant
import { uuidGenerator } from '@docAi-app/utils/helper';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

//Import Icon

//Import Api
import { chatApi } from '@docAi-app/api';

//Import Assets
import IconOnly from '@docAi-app/../public/assets/images/Icon-only.png';

//Import Style
import Style from './Home.module.scss';

const Home = () => {
    const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [disableSearchInput, setSearchInput] = useState<boolean>(false);
    const chatList = useRef<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        chatApi.getChatList().then(({ payload }) => {
            Object.keys(payload).forEach((key) => {
                payload[key].forEach(({ chat_uuid }) => {
                    chatList.current.push(chat_uuid);
                });
            });
        });
    }, []);

    // Your component logic here
    const handleSubmit = (val) => {
        setSearchInput((prev) => !prev);

        let chatUuid = uuidGenerator();

        while (chatList.current.includes(chatUuid)) {
            chatUuid = uuidGenerator();
        }

        navigate(`${ROUTE.ROOT}${ROUTE.CHAT}/${chatUuid}`, {
            state: {
                needToCreate: true,
                userText: val.message,
                indexInfo: val['index'],
                modelId: val['model'],
                chatId: chatUuid,
            },
        });
    };

    return (
        <div className={Style.container}>
            <Dialog
                open={showDialogue}
                onClose={() => {
                    setShowDialogue(false);
                    setHeaderAction(undefined);
                }}
                title={headerAction === 'Create Brain' ? 'Add New Brain' : 'Add Knowledge to Brain'}
            >
                {headerAction === 'Create Brain' ? <CreateUpdateBrain /> : <AddUpdateKnowledge />}
            </Dialog>

            <PageHeader
                title={'Home'}
                showDialogue={true}
                handleButtonClick={(title: HeaderAction) => {
                    setShowDialogue(true);
                    setHeaderAction(title);
                }}
            >
                <div className={Style['container__body']}>
                    <div className={Style.content}>
                        <div className={Style.content__header}>
                            <img src={IconOnly} alt="basf logo" />
                            <h1>Talk to DocAI</h1>
                        </div>
                        <div className={Style.content__body}>
                            <MessageTypeField handleSubmit={handleSubmit} disable={disableSearchInput} />
                        </div>
                    </div>
                </div>
            </PageHeader>
        </div>
    );
};

export { Home };
