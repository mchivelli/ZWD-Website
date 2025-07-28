import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import InfoPage from '@/pages/InfoPage'
import Blackboard from '@/pages/Blackboard'
import Helpdesk from '@/pages/Helpdesk'
import Reminders from '@/pages/Reminders'
import FoodVotes from '@/pages/FoodVotes'
import Wishlist from '@/pages/Wishlist'
import Settings from '@/pages/Settings'
import UserManagement from '@/pages/UserManagement'
import ButtonDemo from '@/pages/ButtonDemo'
import ChangePassword from '@/pages/ChangePassword'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/change-password',
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
              {
          path: 'admin/users',
          element: (
            <ProtectedRoute adminOnly>
              <UserManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: 'demo/buttons',
          element: <ButtonDemo />,
        },
    ],
  },
])
