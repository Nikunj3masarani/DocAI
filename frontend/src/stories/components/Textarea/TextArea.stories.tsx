import type { Meta, StoryObj } from '@storybook/react'
import { TextArea as Component } from './TextArea.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Form Controls/Textarea',
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Message',
    helperText: '',
    error: false,
    multiline: true,
    variant: 'standard',
    required: true,
    rows: 5,
    fullWidth: true,
    tooltip: 'This is tooltop',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Message',
    helperText: '',
    error: false,
    multiline: true,
    variant: 'standard',
    required: true,
    disabled: true,
    rows: 5,
    tooltip: 'This is tooltop',
  },
}
