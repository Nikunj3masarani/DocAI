import type { Meta, StoryObj } from '@storybook/react'
import { DialogComp as Dialog } from './Dialog.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    open: true,
    title: "Let's get you started",
    onClose: (e: boolean) => console.log('onClose', e),
    children: <></>,
  },
}
