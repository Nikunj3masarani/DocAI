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
} from '@docAi-app/stories';
//Import Component

//Import Page

//Import Hook
import { useChatCreate } from '@docAi-app/hooks';
import CheckIcon from '@mui/icons-material/Check';

//Import Context

//Import Model Type
import { itemsProps } from '@docAi-app/stories/components/Menu/Menu.component';

//Import Util, Helper , Constant
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

//Import Icon
import Icons from '@docAi-app/icons';

//Import Api
import { chatApi } from '@docAi-app/api/chat.api';

//Import Assets

//Import Style
import Styles from './MainContainer.module.scss';

const STREAM_LIT_APP = 'Doc Analyzer';

const sideNavigationItems = [
    {
        to: ROUTE.SEARCH,
        label: 'Home',
        icon: Icons.DraftPatent,
    },
    {
        to: ROUTE.INDEX_LIST,
        label: 'Brains',
        icon: Icons.PromptLibrary,
    },
    {
        to: import.meta.env.VITE_STREAM_APP_URL,
        label: STREAM_LIT_APP,
        icon: Icons.SmartToyOutlined,
    },
    {
        label: 'Chat',
        icon: Icons.History,
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
    const isTitleEditing = (messageId: string) => {
        return editTitleId === messageId ? Styles.active : '';
    };
    const [editedMessage, setEditedMessage] = useState<string>();
    const { isChatCreated, setIsChatCreated } = useChatCreate();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isChatCreated) {
            chatApi.getChatList().then((res) => {
                const tempList = res.payload;
                Object.keys(tempList).forEach((key: string) => {
                    const tempObj = tempList[key].map((tempMessage) => {
                        return { message: tempMessage.chat_title, messageId: tempMessage.chat_uuid };
                    });
                    setMessageList((prev) => {
                        return { ...prev, [key]: tempObj };
                    });
                });
            });
            setIsChatCreated(false);
        }
    }, [isChatCreated]);

    const sideNavItem = sideNavigationItems.map((navigationItem, index) => {
        return (
            <>
                {navigationItem.label !== 'Chat' ? (
                    <li className="navItem" key={index}>
                        <NavLink
                            target={navigationItem.label === STREAM_LIT_APP ? '_blank' : undefined}
                            to={navigationItem.to || ''}
                            className={({ isActive }) =>
                                isActive ? `navLink active ${Styles.menuItem}` : `navLink ${Styles.menuItem}`
                            }
                        >
                            <navigationItem.icon width={13} height={16} />
                            {navigationItem.label}
                        </NavLink>
                    </li>
                ) : (
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
                                                <li>
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
                                                                                    return { ...prevMessageList };
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
                                                                                { label: 'edit', value: 0, id: 0 },
                                                                                { label: 'delete', value: 0, id: 1 },
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
                                                                            header={''}
                                                                            subTitle={''}
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
                )}
            </>
        );
    });

    return (
        <div className={Styles.container}>
            <AppDrawer drawerItem={sideNavItem} />

            <div className={Styles.container__body}>
                <div className={Styles.container__children}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export { MainContainer };
