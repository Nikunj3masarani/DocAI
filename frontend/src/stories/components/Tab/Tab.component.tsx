import * as React from 'react';
import { StyledTabs, StyledTab } from './Tab.styled';

type TabItem = {
    label: string;
    value: number;
    canAccess?: boolean;
    icon?: React.ReactElement;
};

type TabProps = {
    items: TabItem[];
    selectedTabValue: number;
    handleTabChange: (value: number) => void;
    type: 'circle' | 'square' | 'normal' | string;
};

const getBackgroundSelectedType = (tabType: string): string => {
    switch (tabType) {
        case 'square': {
            return 'customSelected';
        }
        case 'circle': {
            return 'customSelectedCircle';
        }
        default: {
            return 'customNormal';
        }
    }
};

const getBackgroundRootType = (tabType: string): string => {
    switch (tabType) {
        case 'square': {
            return 'customRoot';
        }
        case 'circle': {
            return 'customRootCircle';
        }
        default: {
            return 'customRootNormal';
        }
    }
};

function TabComponent({ selectedTabValue, handleTabChange, items, type = 'square' }: TabProps): JSX.Element {
    return (
        <StyledTabs
            value={selectedTabValue}
            onChange={(e: React.SyntheticEvent, value: number) => handleTabChange(value)}
            classes={{ indicator: 'customIndicator' }}
        >
            {items.map((item) => (
                <StyledTab
                    icon={item.icon}
                    iconPosition="start"
                    key={item.value}
                    label={item.label}
                    classes={{
                        selected: getBackgroundSelectedType(type),
                        root: getBackgroundRootType(type),
                    }}
                />
            ))}
        </StyledTabs>
    );
}

export { TabComponent };
