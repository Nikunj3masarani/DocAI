import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination.component'

const meta: Meta<typeof Pagination> = {
  title: 'DataGrid/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    count: 10,
    page: 1,
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Basic: Story = {
  render: (props) => <Pagination {...props} />,
  args: {
    count: 40,
    page: 1,
    onChange: (e, page) => {
      console.log(e)
      console.log(page)
    },
  },
}
