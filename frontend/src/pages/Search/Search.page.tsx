//Import Third Party lib
import { Button, Dialog } from '@docAi-app/stories';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import Logo from '@docAi-app/../public/assets/images/logo.svg';

//Import Api

//Import Assets

//Import Style
import Style from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';
import { HeaderAction } from '@docAi-app/types';
import { AddUpdateKnowledge, CreateUpdateBrain, MessageTypeField } from '@docAi-app/components';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import { uuidGenerator } from '@docAi-app/utils/helper';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { chatApi } from '@docAi-app/api';

const Search = () => {
    // useRef
    // useState
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
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

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
            <div className={Style.container__header}>
                <div>
                    <h1>Home</h1>
                </div>
                <div className={Style.container__header__body}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setShowDialogue(true);
                            setHeaderAction('Create Brain');
                        }}
                    >
                        <PsychologyOutlinedIcon />
                        Create Brain
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setShowDialogue(true);
                            setHeaderAction('Add Knowledge');
                        }}
                    >
                        Add Knowledge
                    </Button>
                </div>
            </div>
            <div className={Style['container__body']}>
                <div className={Style.content}>
                    <div className={Style.content__header}>
                        <img src={Logo} alt="basf logo" />
                        <h1>Talk to DocAI</h1>
                    </div>
                    <div className={Style.content__body}>
                        <MessageTypeField handleSubmit={handleSubmit} disable={disableSearchInput} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Search };
