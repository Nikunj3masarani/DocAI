//Import Third Party lib

import { AddUpdateKnowledge, CreateUpdateBrain, MessageTypeField } from '@docAi-app/components';
import { HeaderAction } from '@docAi-app/types';
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
import { Skeleton } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { chatApi } from '@docAi-app/api';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { uuidGenerator } from '@docAi-app/utils/helper';
import { getAlert, useChatCreate } from '@docAi-app/hooks';
const SYSTEM = 'system' as const;
const USER = 'user' as const;

interface Message {
    sender: typeof SYSTEM | typeof USER;
    message: string;
    key: string;
}

interface GetChatApiProps {
    indexId: string;
    userText: string;
    chatId: string;
    modelId: string;
    initialChat?: boolean;
}

const Chat = () => {
    // useRef
    // useState
    const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [canUserType, setCanUserType] = useState<boolean>(true);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
    const systemLastMessageRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const { setIsChatCreated } = useChatCreate();
    const { state } = location;

    // Variables Dependent upon State

    // Api Calls

    const scrollBottom = () => {
        // console.log(messageContainerRef.current?.offsetHeight);
        // console.log(messageContainerRef.current?.scrollHeight);

        // messageContainerRef.current?.scrollTo(0, messageContainerRef.current.scrollHeight);
        messageContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };
    // Event Handlers
    const getChatApi = ({ indexId, userText, chatId, modelId, initialChat = false }: GetChatApiProps) => {
        chatApi
            .getChat({
                index_uuid: indexId,
                query: userText,
                chat_uuid: chatId,
                model_uuid: modelId,
            })
            .then(async (response) => {
                while (true) {
                    const res = await response.next();
                    const { value, done } = res;
                    if (done) {
                        setCanUserType(true);
                        break;
                    }

                    if (value) {
                        setShowLoading(false);
                    }
                    // for (let i = 0; i < value.length; i++) {
                    //     systemLastMessageRef.current!.innerHTML += value.at(i);
                    // }
                    systemLastMessageRef.current!.innerHTML += value;
                    // systemLastMessageRef.current!.innerHTML +=
                    scrollBottom();
                }

                if (initialChat) {
                    setIsChatCreated(true);
                    navigate('.', { replace: true });
                }
            });
    };
    // Helpers
    useEffect(() => {
        if (state && state.needToCreate) {
            setCanUserType(false);
            setMessageList(() => {
                return [
                    {
                        sender: 'user',
                        message: `${state.userText}`,
                        key: uuidGenerator(),
                    },
                    { sender: 'system', message: '', key: uuidGenerator() },
                ];
            });
            setShowLoading(true);

            getChatApi({
                indexId: state.indexId,
                userText: state.userText,
                chatId: state.chatId,
                modelId: state.modelId,
                initialChat: true,
            });
        } else {
            const chatUuid = params[ROUTE.CHAT_ID];
            chatApi
                .getChatMessage({ chat_uuid: chatUuid })
                .then((res) => {
                    let tempMessageList: Message[] = [];
                    res?.payload?.forEach((tempMessage) => {
                        tempMessageList.push({
                            sender: 'user',
                            message: tempMessage.user_message,
                            key: uuidGenerator(),
                        });

                        tempMessageList.push({
                            sender: 'system',
                            message: tempMessage.assistant_message,
                            key: uuidGenerator(),
                        });
                    });
                    if (tempMessageList && tempMessageList.length > 0) setMessageList(tempMessageList);
                    scrollBottom();
                })
                .catch(() => {
                    navigate(`${ROUTE.ROOT}${ROUTE.SEARCH}`);
                });
        }
    }, [params[ROUTE.CHAT_ID]]);

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
                {headerAction === 'Create Brain' ? <CreateUpdateBrain /> : <AddUpdateKnowledge />}
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
                    {messageList?.map((chat, index) => {
                        return (
                            <>
                                <div
                                    key={chat.key}
                                    className={`${Style.message} ${getChat(chat)}`}
                                    style={{
                                        visibility: `${showLoading && index === messageList.length - 1 && chat.sender === 'system' ? 'hidden' : 'visible'}`,
                                    }}
                                    ref={
                                        index === messageList.length - 1 && chat.sender === 'system'
                                            ? systemLastMessageRef
                                            : null
                                    }
                                >
                                    {/* {chat.sender === 'system' ? (
                                        <div className={Style.system__header}>
                                            <span>
                                                <DescriptionIcon />
                                                indexName
                                            </span>
                                            <span>modelName</span>
                                        </div>
                                    ) : null} */}

                                    {chat.message}
                                    {chat.sender === 'system' ? (
                                        <div className={Style.feedback}>
                                            <IconButton
                                                onClick={() => {
                                                    navigator.clipboard.writeText(chat.message);
                                                    getAlert('success', 'Copied text successfully');
                                                }}
                                            >
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
                                {index === messageList.length - 1 && showLoading ? (
                                    <div className={`${Style.messageSkeleton} `}>
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                    </div>
                                ) : null}
                            </>
                        );
                    })}
                    <div ref={messageContainerRef}></div>
                </div>

                <div className={Style.container__footer}>
                    <MessageTypeField
                        disable={!canUserType}
                        handleSubmit={(v) => {
                            getChatApi({
                                indexId: v.index.value,
                                modelId: v.model,
                                userText: v.message,
                                chatId: params[ROUTE.CHAT_ID] ?? '',
                            });

                            setCanUserType(false);
                            setShowLoading(true);
                            setMessageList((prev) => {
                                return [
                                    ...prev,
                                    { message: v.message, sender: 'user', key: uuidGenerator() },
                                    { sender: 'system', message: '', key: uuidGenerator() },
                                ];
                            });
                            scrollBottom();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export { Chat };
