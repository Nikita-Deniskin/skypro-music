import { useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import ProtectedRoute from './protected-route'
import Main from '../../pages/main/main'
import Favorites from '../../pages/favorites/favorites'
import SignIn from '../../pages/sign/Signin'
import { SignUp } from '../../pages/sign/Signup'
import { NotFound } from '../../pages/notfound/notfound'
import Categories from '../../pages/category/category'
import { AuthContext } from '../context/context'

const AppRoutes = () => {
  const { isAuth, isLoading } = useContext(AuthContext)
  const element = useRoutes([
    { path: '/login', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    {
      element: <ProtectedRoute isAllowed={isAuth !== null || isLoading} />,
      children: [
        { path: '/', element: <Main /> },
        { path: '/favorites', element: <Favorites /> },
        { path: 'category/:id', element: <Categories /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ])
  return element
}
export default AppRoutes