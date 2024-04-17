import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { InputChips } from './InputChips.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Form Controls/InputChips',
  component: InputChips,
  tags: ['autodocs'],
} satisfies Meta<typeof InputChips>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chips, setChips] = useState<string[]>([])
    return (
      <InputChips
        {...props}
        value={chips}
        onChange={(value: string[]) => setChips(value)}
      />
    )
  },

  args: {
    variant: 'standard',
    label: 'Input chips',
    required: true,
    tooltip: 'This is tooltip',
  },
}
