import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MenuWithTag from './Menu.component';
export default {
    title: 'MenuWithTag',
    component: MenuWithTag,
    argTypes: {},
} as ComponentMeta<typeof MenuWithTag>;

const Template: ComponentStory<typeof MenuWithTag> = (args) => {
    return <MenuWithTag {...args} />;
};

export const Simple: ComponentStory<typeof MenuWithTag> = Template.bind({});
Simple.args = {
    menuItems: [
        { id: 1, value: 'value', label: 'label', disabled: true },
        { id: 2, value: 'value2', label: 'label2', disabled: false },
        { id: 3, value: 'value3', label: 'label3', disabled: false },
    ],
    handleItemClick: (item) => console.log(item),
};
