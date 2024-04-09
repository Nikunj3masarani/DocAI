//Import Third Party lib

import { AddKnowledge, CreateBrain } from '@docAi-app/components';
import { HeaderAction } from '@docAi-app/types/common.type';
import { useEffect, useState } from 'react';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context
import { IconButton } from '@docAi-app/stories';
//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
//Import Api

//Import Assets

//Import Style
import Style from './Chat.module.scss';
import { Button, Dialog } from '@docAi-app/stories';
import { InputWithSelect } from '@docAi-app/stories/components/InputWithSelect/InputWithSelect.component';
const SYSTEM = 'system' as const;
const USER = 'user' as const;

interface Message {
    sender: typeof SYSTEM | typeof USER;
    message: string;
}
const Chat = () => {
    // useRef
    // useState
    const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [canUserType, setCanUserType] = useState<boolean>(true);
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers
    useEffect(() => {
        setMessageList(() => {
            return [
                {
                    sender: 'user',
                    message:
                        'What is stack , tell me descriptive about it , how can you describe more about it , it will help me to gain knowledge of stack data structure and its various use',
                },
                { sender: 'system', message: 'Stack is data structure' },
            ];
        });
    }, []);

    // JSX Methods

    // Your component logic here
    const getChat = (chat: Message) => {
        return chat.sender === 'system' ? Style.system : Style.user;
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
                {headerAction === 'Create Brain' ? <CreateBrain /> : <AddKnowledge />}
            </Dialog>
            <div className={Style.container__header}>
                <div>
                    <h1>Chat</h1>
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
            <div className={Style.container__body}>
                <div className={Style.messageContainer}>
                    {messageList?.map((chat) => {
                        return (
                            <>
                                <div className={`${Style.message} ${getChat(chat)}`}>
                                    {chat.message}
                                    {chat.sender === 'system' ? (
                                        <div className={Style.feedback}>
                                            <IconButton>
                                                <ContentCopyIcon />
                                            </IconButton>
                                            <IconButton>
                                                <TextSnippetIcon />
                                            </IconButton>
                                            <IconButton>
                                                <ThumbUpOffAltIcon />
                                            </IconButton>
                                            <IconButton>
                                                <ThumbDownOffAltIcon />
                                            </IconButton>
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        );
                    })}
                </div>

                <div className={Style.container__footer}>
                    <InputWithSelect
                        disable={!canUserType}   
                        handleSubmit={(v) => {
                            console.log(v);
                            setCanUserType(false);
                            setMessageList((prev) => {
                                return [...prev, { message: v.message, sender: 'user' }];
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export { Chat };
