import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import Landing from './pages/landing'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Link from './pages/link'
import RedirectLink from './pages/redirect-link'
import UrlProvider from './context'



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/link/:id',
        element: <Link />
      },
      {
        path: '/:id',
        element: <RedirectLink />
      }
    ]

  }
])

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App