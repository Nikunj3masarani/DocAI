//Import Third Party lib
import { useState } from 'react';

//Import Storybook
import { TabComponent } from '@docAi-app/stories';

//Import Component
import { AddUpdateKnowledge, People, BrainSettings } from '@docAi-app/components';

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
import Style from './UpdateIndex.module.scss';
import { Button } from '@docAi-app/stories';
import { useNavigate, useNavigation } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
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
        // icon: <SettingsIcon />,
    },
    {
        label: 'Update Knowledge',
        value: 1,
        canAccess: true,
        // icon: <AssignmentIcon />,
    },
    {
        label: 'Invite People',
        value: 2,
        canAccess: true,
        // icon: <AccountCircleIcon />,
    },
];

const UpdateIndex = () => {
    // useState
    const [activeTab, setActiveTab] = useState<number>(0);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(`${ROUTE.ROOT}${ROUTE.BRAINS}`);
    };
    // Your component logic here
    return (
        <div className={Style.container}>
            <div className={Style.container__header}>
                <h1>Manage Brain</h1>
                <Button
                    variant="contained"
                    onClick={() => {
                        goBack();
                    }}
                >
                    Go Back
                </Button>
            </div>

            <div className={Style.container__body}>
                <TabComponent
                    items={tabItem}
                    selectedTabValue={activeTab}
                    handleTabChange={setActiveTab}
                    type="square"
                />
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
            </div>
        </div>
    );
};

export { UpdateIndex };
