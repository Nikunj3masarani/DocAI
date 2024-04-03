import { Meta, StoryObj } from '@storybook/react'
import { NoDataFound } from './NoDataFound.component'

const meta = {
  title: 'NoDataFound',
  component: NoDataFound,
} satisfies Meta<typeof NoDataFound>

export default meta
type Story = StoryObj<typeof NoDataFound>

export const NoDataFoundComp: Story = {
  args: {
    message: 'No Data Found',
    className: 'h-[400px]',
  },
}
