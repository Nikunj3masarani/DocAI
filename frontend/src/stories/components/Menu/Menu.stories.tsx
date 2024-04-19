import { Meta, StoryObj } from '@storybook/react';
import { ThreeDotItemMenu } from './Menu.component';
const meta: Meta<typeof ThreeDotItemMenu> = {
    title: 'MenuWithTag',
    component: ThreeDotItemMenu,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ThreeDotItemMenu>;

export const Simple: Story = {
    args: {
        menuItems: [
            { id: 1, value: 'value', label: 'label', disabled: true },
            { id: 2, value: 'value2', label: 'label2', disabled: false },
            { id: 3, value: 'value3', label: 'label3', disabled: false },
        ],
        handleItemClick: (item) => console.log(item),
    },
};
