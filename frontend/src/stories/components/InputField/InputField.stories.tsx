import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField.component';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Form Controls/InputField',
    component: InputField,
    tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
        label: 'Legal name',
        required: true,
        variant: 'standard',
        tooltip: 'Legal name',
    },
};

export const Outline: Story = {
    args: {
        label: 'Legal name',
    },
};
