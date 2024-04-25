//Import Third Party lib
import { useState } from 'react';

//Import Storybook
import { Dialog } from '@docAi-app/stories';

//Import Component
import { AddUpdateKnowledge, CreateUpdateBrain, BrainGrid, PageHeader } from '@docAi-app/components';

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { HeaderAction } from '@docAi-app/types';

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

const IndexList = () => {
    // useState
    const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    const [isBrainCreated, setIsBrainCreated] = useState<boolean>(false);

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
            <PageHeader
                title={'My Brains'}
                showDialogue={true}
                handleButtonClick={(title: HeaderAction) => {
                    setShowDialogue(true);
                    setHeaderAction(title);
                }}
            >
                <BrainGrid isBrainChange={isBrainCreated} initialSearchValue={''} />
            </PageHeader>
        </div>
    );
};

export { IndexList };
