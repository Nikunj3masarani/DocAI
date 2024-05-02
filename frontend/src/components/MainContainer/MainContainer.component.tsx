//Import Third Party lib
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

//Import Storybook
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppDrawer,
    ThreeDotItemMenu,
    IconButton,
    Dialog,
} from '@docAi-app/stories';

//Import Component

//Import Page
import { AddNewUser } from '@docAi-app/components';

//Import Hook
import { useAuth, useChatCreate } from '@docAi-app/hooks';

//Import Context

//Import Model Type
import { IconType } from '@docAi-app/types';
import { itemsProps } from '@docAi-app/stories/components/Menu/Menu.component';

//Import Util, Helper , Constant
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

//Import Icon
import Icons from '@docAi-app/icons';
import CheckIcon from '@mui/icons-material/Check';

//Import Api
import { chatApi } from '@docAi-app/api/chat.api';

//Import Assets

//Import Style
import Styles from './MainContainer.module.scss';
import {
    ACCESS_TOKEN_KEY,
    CURRENT_USER_EMAIL,
    REDIRECT_URL,
    USER_UUID,
} from '@docAi-app/utils/constants/storage.constant';
import { clearLocalStorage, removeFromLocalStorage } from '@docAi-app/utils/helper';

const STREAM_LIT_APP = 'Doc Analyzer';
interface SideNavigationItems {
    to?: string;
    label: string;
    icon: (props: IconType) => JSX.Element;
    type: 'link' | 'externalLink' | 'accordion' | 'dialogue' | 'action';
    position: 'top' | 'bottom';
}

const sideNavigationItems: SideNavigationItems[] = [
    {
        to: ROUTE.HOME,
        label: 'Home',
        icon: Icons.DraftPatent,
        type: 'link',
        position: 'top',
    },
    {
        to: ROUTE.INDEX_LIST,
        label: 'Brains',
        icon: Icons.PromptLibrary,
        type: 'link',
        position: 'top',
    },
    {
        to: import.meta.env.VITE_STREAM_APP_URL,
        label: STREAM_LIT_APP,
        icon: Icons.SmartToyOutlined,
        type: 'externalLink',
        position: 'top',
    },
    {
        label: 'Chat',
        icon: Icons.History,
        type: 'accordion',
        position: 'top',
    },
    {
        label: 'Add User',
        icon: Icons.Person,
        type: 'dialogue',
        position: 'bottom',
    },
    {
        label: 'Logout',
        icon: Icons.Logout,
        type: 'action',
        position: 'bottom',
    },
];

const getAccordionClasses = (activeAccordion: boolean) => {
    return `${activeAccordion ? `active ${Styles.accordion}` : ` ${Styles.accordion}`}`;
};
interface MessageList {
    message: string;
    messageId: string;
}

const handleEditMessageTitle = ({ messageId, message }: { messageId: string; message: string }) => {
    chatApi.editMessageTitle({
        requestBody: {
            title: message,
        },
        requestParams: {
            chat_uuid: messageId,
        },
    });
};

const handleDeleteChat = ({ messageId }: { messageId: string }) => {
    chatApi.deleteChat({ chat_uuid: messageId });
};

const MainContainer = () => {
    const [activeAccordion, setActiveAccordion] = useState(false);
    const [messageList, setMessageList] = useState<Record<string, MessageList[]>>({});
    const [editTitleId, setEditTitleId] = useState<string>('');
    const [editedMessage, setEditedMessage] = useState<string>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [dialogueHeader, setDialogueHeader] = useState<string>('');
    const { isChatCreated, setIsChatCreated } = useChatCreate();
    const params = useParams();
    const navigate = useNavigate();
    const { setIsLogin } = useAuth();

    const isTitleEditing = (messageId: string) => {
        return editTitleId === messageId ? Styles.active : '';
    };

    useEffect(() => {
        if (isChatCreated) {
            chatApi.getChatList().then((res) => {
                const tempList = res.payload;
                const newMessageList: Record<string, MessageList[]> = {};
                Object.keys(tempList).forEach((key: string) => {
                    const tempObj = tempList[key].map((tempMessage) => {
                        return { message: tempMessage.chat_title, messageId: tempMessage.chat_uuid };
                    });

                    newMessageList[key] = tempObj;
                });
                setMessageList(newMessageList);
            });
            setIsChatCreated(false);
        }
    }, [isChatCreated]);

    const renderNavItem = ({ navigationItem, index }: { navigationItem: SideNavigationItems; index: number }) => {
        switch (navigationItem.type) {
            case 'accordion': {
                return (
                    <li className="navItem" key={index}>
                        {
                            <Accordion
                                expanded={activeAccordion}
                                className={getAccordionClasses(activeAccordion)}
                                onChange={() => {
                                    setActiveAccordion(!activeAccordion);
                                }}
                            >
                                <AccordionSummary className={Styles.accordionHeader}>
                                    <div className={Styles['accordionHeader__summary']}>
                                        <navigationItem.icon />
                                        Chat
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className={Styles.accordionDetails}>
                                    <ul className={Styles.chatList}>
                                        {Object.keys(messageList).map((key: string) => {
                                            return (
                                                <li key={key} className={Styles.messageListkey}>
                                                    {key}
                                                    <ul>
                                                        {messageList[key].map(({ message, messageId }: MessageList) => {
                                                            const currentChat = params[ROUTE.CHAT_ID];
                                                            return (
                                                                <li key={messageId}>
                                                                    <div
                                                                        className={`${Styles.messageTitleContainerNavLink} ${currentChat === messageId ? Styles['messageTitleContainerNavLink__active'] : ''}`}
                                                                    />
                                                                    <div
                                                                        className={`${Styles.messageTitleContainer}  ${messageId !== editTitleId ? Styles['messageTitleContainer__enable'] : Styles['messageTitleContainer__disable']}`}
                                                                        onClick={() => {
                                                                            navigate(
                                                                                `${ROUTE.ROOT}${ROUTE.CHAT}/${messageId}`,
                                                                            );
                                                                        }}
                                                                    />
                                                                    <input
                                                                        value={
                                                                            messageId === editTitleId
                                                                                ? editedMessage
                                                                                : message
                                                                        }
                                                                        disabled={messageId !== editTitleId}
                                                                        onChange={(v) => {
                                                                            setEditedMessage(v.target.value);
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className={`${Styles.checkButton} ${isTitleEditing(messageId)}`}
                                                                    >
                                                                        <IconButton
                                                                            onClick={() => {
                                                                                handleEditMessageTitle({
                                                                                    message: editedMessage!,
                                                                                    messageId: messageId,
                                                                                });
                                                                                setMessageList((prevMessageList) => {
                                                                                    Object.keys(
                                                                                        prevMessageList,
                                                                                    ).forEach((key) => {
                                                                                        prevMessageList[key] =
                                                                                            prevMessageList[key].map(
                                                                                                ({
                                                                                                    message,
                                                                                                    messageId,
                                                                                                }: MessageList) => {
                                                                                                    if (
                                                                                                        messageId ===
                                                                                                            editTitleId &&
                                                                                                        editedMessage
                                                                                                    ) {
                                                                                                        return {
                                                                                                            message:
                                                                                                                editedMessage,
                                                                                                            messageId,
                                                                                                        };
                                                                                                    }
                                                                                                    return {
                                                                                                        message,
                                                                                                        messageId,
                                                                                                    };
                                                                                                },
                                                                                            );
                                                                                    });
                                                                                    return {
                                                                                        ...prevMessageList,
                                                                                    };
                                                                                });

                                                                                setEditTitleId('-1');
                                                                            }}
                                                                        >
                                                                            <CheckIcon />
                                                                        </IconButton>
                                                                    </div>
                                                                    <div className={Styles.threeDotMenu}>
                                                                        <ThreeDotItemMenu
                                                                            menuItems={[
                                                                                {
                                                                                    label: 'edit',
                                                                                    value: 0,
                                                                                    id: 0,
                                                                                },
                                                                                {
                                                                                    label: 'delete',
                                                                                    value: 0,
                                                                                    id: 1,
                                                                                },
                                                                            ]}
                                                                            handleItemClick={(
                                                                                v: Partial<itemsProps>,
                                                                            ) => {
                                                                                if (v.id === 0) {
                                                                                    setEditTitleId(messageId);
                                                                                    setEditedMessage(message);
                                                                                } else {
                                                                                    handleDeleteChat({
                                                                                        messageId: messageId + '',
                                                                                    });
                                                                                    const messageToDeleteId = messageId;

                                                                                    setMessageList(
                                                                                        (prevMessageList) => {
                                                                                            Object.keys(
                                                                                                prevMessageList,
                                                                                            ).forEach((key) => {
                                                                                                prevMessageList[key] =
                                                                                                    prevMessageList[
                                                                                                        key
                                                                                                    ].filter(
                                                                                                        ({
                                                                                                            messageId,
                                                                                                        }: MessageList) => {
                                                                                                            return (
                                                                                                                messageToDeleteId !==
                                                                                                                messageId
                                                                                                            );
                                                                                                        },
                                                                                                    );
                                                                                                if (
                                                                                                    prevMessageList[key]
                                                                                                        .length === 0
                                                                                                )
                                                                                                    delete prevMessageList[
                                                                                                        key
                                                                                                    ];
                                                                                            });

                                                                                            return {
                                                                                                ...prevMessageList,
                                                                                            };
                                                                                        },
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        }
                    </li>
                );
            }
            case 'dialogue': {
                return (
                    <li
                        className="navItem"
                        key={index}
                        onClick={() => {
                            setShowDialogue(true);
                            setDialogueHeader('Add New User');
                        }}
                    >
                        <div className={`navLink ${Styles.menuItem}`}>
                            <navigationItem.icon width={13} height={16} />
                            {navigationItem.label}
                        </div>
                    </li>
                );
            }
            case 'action': {
                return (
                    <li
                        className="navItem"
                        key={index}
                        onClick={() => {
                            clearLocalStorage();
                            setIsLogin(false);
                        }}
                    >
                        <div className={`navLink ${Styles.menuItem}`}>
                            <navigationItem.icon width={13} height={16} />
                            {navigationItem.label}
                        </div>
                    </li>
                );
            }
            default: {
                return (
                    <li className="navItem" key={index}>
                        <NavLink
                            target={navigationItem.type === 'externalLink' ? '_blank' : undefined}
                            to={navigationItem.to || ''}
                            className={({ isActive }) =>
                                isActive ? `navLink active ${Styles.menuItem}` : `navLink ${Styles.menuItem}`
                            }
                        >
                            <navigationItem.icon width={13} height={16} />
                            {navigationItem.label}
                        </NavLink>
                    </li>
                );
            }
        }
    };

    const topItem = sideNavigationItems.map((navigationItem, index) => {
        if (navigationItem.position === 'bottom') {
            return null;
        }
        return renderNavItem({ navigationItem, index });
    });

    const bottomItem = sideNavigationItems.map((navigationItem, index) => {
        if (navigationItem.position === 'top') {
            return null;
        }
        return renderNavItem({ navigationItem, index });
    });

    return (
        <div className={Styles.container}>
            <Dialog
                minWidth="60rem"
                open={showDialogue}
                onClose={() => {
                    setShowDialogue(false);
                    setDialogueHeader('');
                }}
                title={dialogueHeader}
            >
                {dialogueHeader !== '' ? (
                    <AddNewUser
                        handleClose={() => {
                            setShowDialogue(false);
                            setDialogueHeader('');
                        }}
                    />
                ) : null}
            </Dialog>

            <AppDrawer bottomItem={bottomItem} topItem={topItem} />
            <div className={Styles.container__body}>
                <div className={Styles.container__children}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export { MainContainer };
