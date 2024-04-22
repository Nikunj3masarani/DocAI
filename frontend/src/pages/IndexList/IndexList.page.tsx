//Import Third Party lib

import { AddUpdateKnowledge, CreateUpdateBrain, DataGridComp } from '@docAi-app/components';
import { Button, Dialog } from '@docAi-app/stories';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
//Import Api

//Import Assets

//Import Style
import Styles from './IndexList.module.scss';
import { useEffect, useState } from 'react';
import { HeaderAction } from '@docAi-app/types';

const IndexList = () => {
    // useRef
    // useState
    const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [isBrainCreated, setIsBrainCreated] = useState<boolean>(false);
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods
    useEffect(() => {
        if (isBrainCreated) {
        }
    }, [isBrainCreated]);
    // Your component logic here

    return (
        <div>
            <Dialog
                open={showDialogue}
                onClose={() => {
                    setShowDialogue(false);
                    setHeaderAction(undefined);
                }}
                title={headerAction === 'Create Brain' ? 'Add New Brain' : 'Add Knowledge to Brain'}
            >
                {headerAction === 'Create Brain' ? (
                    <CreateUpdateBrain
                        close={() => {
                            setShowDialogue(false);
                            setHeaderAction(undefined);
                        }}
                        isBrainCreated={() => {
                            setIsBrainCreated((prev) => !prev);
                        }}
                    />
                ) : (
                    <AddUpdateKnowledge />
                )}
            </Dialog>
            <div className={Styles.header}>
                <div>
                    <h1>Home</h1>
                </div>
                <div className={Styles.header__body}>
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
            <DataGridComp isBrainChange={isBrainCreated} initialSearchValue={''} />
        </div>
    );
};

export { IndexList };
