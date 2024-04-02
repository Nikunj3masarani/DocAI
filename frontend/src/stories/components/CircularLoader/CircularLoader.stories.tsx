import type { Meta, StoryObj } from '@storybook/react';
import { CircularLoader as CircularLoaderComp } from './CircularLoader.component';

const meta: Meta<typeof CircularLoaderComp> = {
    title: 'Utility/CircularLoader',
    component: CircularLoaderComp,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CircularLoaderComp>;

export const CircularLoader: Story = {};
