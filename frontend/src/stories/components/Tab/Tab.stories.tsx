import { ComponentProps, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TabComponent } from './Tab.component';

const tabItems = [
    {
        label: 'Activity',
        value: 0,
    },
    {
        label: 'Resume',
        value: 1,
    },
    {
        label: 'Chat',
        value: 2,
    },
    {
        label: 'Message',
        value: 3,
    },
];

const meta = {
    title: 'Navigation/Tab',
    component: TabComponent,
    tags: ['autodocs'],
} satisfies Meta<typeof TabComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const RenderTabComponents = (props: ComponentProps<typeof TabComponent>) => {
    const [selectedTab, setSelectedTab] = useState(props.selectedTabValue);
    return (
        <TabComponent {...props} items={props.items} selectedTabValue={selectedTab} handleTabChange={setSelectedTab} />
    );
};

export const Default: Story = {
    render: RenderTabComponents,
    args: {
        selectedTabValue: 1,
        items: tabItems,
        handleTabChange: (value: number) => {
            console.log(value);
        },
        type: 'normal',
    },
};
