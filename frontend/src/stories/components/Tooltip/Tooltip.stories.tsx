import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip.component';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Legal name',
        children: <p>Test</p>,
        placement: 'top',
    },
};
