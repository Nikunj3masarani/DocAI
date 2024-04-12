import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Form Controls/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
    disabled: true,
  },
}

export const Medium: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
    size: 'small',
  },
}
