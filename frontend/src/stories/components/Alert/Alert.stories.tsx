import type { Meta, StoryObj } from '@storybook/react';
import Component from './Alert.component';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Alert',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Success: Story = {
    args: {
        type: 'success',
        duration: 5000,
        message: 'test',
        position: 'top-right',
    },
};

export const Error: Story = {
    args: {
        type: 'error',
        duration: 5000,
        message: 'test',
        position: 'top-right',
    },
};
