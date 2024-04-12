//Import Third Party lib

import { AddKnowledge, CreateBrain } from '@docAi-app/components';
import { HeaderAction } from '@docAi-app/types/common.type';
import { useEffect, useRef, useState } from 'react';

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
import DescriptionIcon from '@mui/icons-material/Description';
//Import Api

//Import Assets

//Import Style
import Style from './Chat.module.scss';
import { Button, Dialog } from '@docAi-app/stories';
import { InputWithSelect } from '@docAi-app/stories/components/InputWithSelect/InputWithSelect.component';
import { Skeleton } from '@mui/material';
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
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
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
        messageContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
                <div className={Style.messageContainer} ref={messageContainerRef}>
                    {messageList?.map((chat, index) => {
                        return (
                            <>
                                <div className={`${Style.message} ${getChat(chat)}`}>
                                    {chat.sender === 'system' ? (
                                        <div className={Style.system__header}>
                                            <span>
                                                <DescriptionIcon />
                                                indexName
                                            </span>
                                            <span>modelName</span>
                                        </div>
                                    ) : null}

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
                                {index === messageList.length - 1 && !canUserType ? (
                                    
                                    <div className={`${Style.messageSkeleton} `}>
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                    </div>
                                ) : null}
                            </>
                        );
                    })}
                </div>

                <div className={Style.container__footer}>
                    <InputWithSelect
                        disable={!canUserType}
                        handleSubmit={(v) => {
                            setCanUserType(false);
                            setMessageList((prev) => {
                                return [...prev, { message: v.message, sender: 'user' }];
                            });
                            messageContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export { Chat };
