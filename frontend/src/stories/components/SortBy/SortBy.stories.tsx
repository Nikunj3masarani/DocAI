import type { Meta, StoryObj } from '@storybook/react';
import { SortBy as SortByComp } from './SortBy.component';

const meta = {
    title: 'SortBy',
    component: SortByComp,
    tags: ['autodocs'],
} satisfies Meta<typeof SortByComp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SortBy: Story = {
    args: {
        items: [
            { label: 'Latest First', value: 'latestFirst' },
            { label: 'Oldest First', value: 'oldestFirst' },
        ],
        value: {
            label: 'Latest First',
            value: 'latestFirst',
        },
    },
};
