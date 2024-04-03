/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { AppDrawer } from './AppDrawer.component'

const meta = {
  title: 'Naviagation/AppDrawer',
  component: AppDrawer,
  tags: ['autodocs'],
} satisfies Meta<typeof AppDrawer>
export default meta
type Story = StoryObj<typeof meta>

export const Controlled: Story = {
  render: (props) => {
    return <AppDrawer {...props} />
  },

  args: {
    drawerItem: (
      <>
        <li className="navItem">
          <InboxIcon />
          <a className="navLink" href="">
            Public catalogue
          </a>
        </li>
        <li className="navItem">
          <InboxIcon />
          <a className="navLink" href="">
            Service management
          </a>
        </li>
        <li className="navItem">
          <InboxIcon />
          <a className="navLink active" href="">
            Resources management
          </a>
        </li>
        <li className="navItem">
          <InboxIcon />{' '}
          <a className="navLink" href="">
            Wallet
          </a>
        </li>
        <li className="navItem">
          <InboxIcon />{' '}
          <a className="navLink" href="">
            Profile
          </a>
        </li>
      </>
    ),
  },
}
