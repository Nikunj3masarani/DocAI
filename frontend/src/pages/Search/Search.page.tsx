//Import Third Party lib
import { Button, Dialog, InputChips, InputWithSelect, SearchInput, Select } from '@docAi-app/stories';
import { Form } from 'react-final-form';

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
import { Field } from 'react-final-form';
import { useState } from 'react';
import { HeaderAction } from '@docAi-app/types/common.type';
import { AddKnowledge, CreateBrain } from '@docAi-app/components';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import { chatApi } from '@docAi-app/api/chat.api';
import { uuidGenerator } from '@docAi-app/utils/helper/common.helper';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

const Search = () => {
    // useRef
    // useState
    const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [disableSearchInput, setSearchInput] = useState<boolean>(false);
    const navigate = useNavigate();
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here
    const handleSubmit = (val) => {
        setSearchInput((prev) => !prev);

        const chatUuid = uuidGenerator();
        chatApi
            .getChat({ index_uuid: val['index'].value, query: val.message, chat_uuid: chatUuid })
            .then(() => {
                navigate(`${ROUTE.ROOT}/${ROUTE.CHAT}/${chatUuid}`);
            })
            .catch((err) => {
                console.log(err);
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
                {headerAction === 'Create Brain' ? <CreateBrain /> : <AddKnowledge />}
            </Dialog>
            <div className={Style.container__header}>
                <div>
                    <h1>My Brains</h1>
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
                        <h1>Talk to DocAi</h1>
                    </div>
                    <div className={Style.content__body}>
                        <InputWithSelect handleSubmit={handleSubmit} disable={disableSearchInput} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Search };
