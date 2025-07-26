import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import InfoPage from '@/pages/InfoPage'
import Blackboard from '@/pages/Blackboard'
import Helpdesk from '@/pages/Helpdesk'
import Reminders from '@/pages/Reminders'
import FoodVotes from '@/pages/FoodVotes'
import Wishlist from '@/pages/Wishlist'
import Settings from '@/pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'info',
        element: <InfoPage />,
      },
      {
        path: 'blackboard',
        element: <Blackboard />,
      },
      {
        path: 'helpdesk',
        element: <Helpdesk />,
      },
      {
        path: 'reminders',
        element: <Reminders />,
      },
      {
        path: 'food-votes',
        element: <FoodVotes />,
      },
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])
