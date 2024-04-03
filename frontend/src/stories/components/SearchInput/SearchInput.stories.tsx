/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput as Component } from './SearchInput.component'

const meta: Meta<typeof Component> = {
  title: 'Form Controls/SearchInput',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

export const Controlled: Story = {
  render: (props) => {
    const [search, setSearch] = useState('')

    return (
      <Component
        {...props}
        value={search}
        onClearClick={() => setSearch('')}
        onChange={(e) => setSearch(e.target.value)}
      />
    )
  },

  args: {
    placeholder: 'Search frauds',
    value: '',
  },
}
