//Import Third Party lib

import { TabComponent } from '@docAi-app/stories';
import { useState } from 'react';
import { BrainSettings } from '../BrainSettings/BrainSettings.component';
import { AddUpdateKnowledge, People } from '..';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Import Api

//Import Assets

//Import Style

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

const tabItem = [
    {
        label: 'Settings',
        value: 0,
        canAccess: true,
        icon: <SettingsIcon />,
    },
    {
        label: 'Update Knowledge',
        value: 1,
        canAccess: true,
        icon: <AssignmentIcon />,
    },
    {
        label: 'Invite People',
        value: 2,
        canAccess: true,
        icon: <AccountCircleIcon />,
    },
];
const UpdateIndex = () => {
    // useRef
    // useState
    // Variables Dependent upon State
    const [activeTab, setActiveTab] = useState<number>(0);
    // const [headerAction, setHeaderAction] = useState<HeaderAction | undefined>();
    // const [showDialogue, setShowDialogue] = useState<boolean>(false);
    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here
    return (
        <>
            <TabComponent items={tabItem} selectedTabValue={activeTab} handleTabChange={setActiveTab} type="square" />
            <CustomTabPanel value={0} index={activeTab}>
                <BrainSettings />
            </CustomTabPanel>
            <CustomTabPanel value={1} index={activeTab}>
                <>
                    <AddUpdateKnowledge />
                </>
            </CustomTabPanel>
            <CustomTabPanel value={2} index={activeTab}>
                <>
                    <People />
                </>
            </CustomTabPanel>
        </>
    );
};

export { UpdateIndex };
