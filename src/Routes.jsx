import { useRoutes } from 'react-router-dom'

import Login from 'views/Login'
import Index from 'views/Index'
import About from 'views/About'

const routes = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'about',
    element: <About />
  }
]

const Routes = () => {
  const routers = useRoutes(routes)
  return routers
}

export default Routes
