import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton.component';
import Icons from '@docAi-app/icons';

const meta = {
    title: 'Form Controls/Icon Button',
    component: IconButton,
    tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderIconButton = (props: ComponentProps<typeof IconButton>) => {
    return (
        <IconButton {...props}>
            <Icons.BrowsePrompt />
        </IconButton>
    );
};

export const Default: Story = {
    render: renderIconButton,
};

export const Bordered: Story = {
    render: renderIconButton,
    args: {
        isbordered: true,
    },
};
