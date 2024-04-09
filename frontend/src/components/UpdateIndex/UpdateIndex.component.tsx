//Import Third Party lib

import { TabComponent } from '@docAi-app/stories';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { BrainSettings } from '../BrainSettings/BrainSettings.component';
import { AddKnowledge } from '..';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

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
    },
    {
        label: 'Update Knowledge',
        value: 1,
        canAccess: true,
    },
    {
        label: 'Invite People',
        value: 2,
        canAccess: true,
    },
];
const UpdateIndex = () => {
    // useRef
    // useState
    // Variables Dependent upon State
    const [activeTab, setActiveTab] = useState<number>(0);

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
                    <AddKnowledge />
                </>
            </CustomTabPanel>
        </>
    );
};

export { UpdateIndex };
