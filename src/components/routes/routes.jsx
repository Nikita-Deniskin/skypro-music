import { useRoutes } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import Main from '../../pages/main/main'
import Favorites from '../../pages/favorites/favorites'
import SignIn from '../../pages/sign/Signin'
import SignUp from '../../pages/sign/Signup'
import NotFound from '../../pages/notfound/notfound'
import Categories from '../../pages/category/category'

const AppRoutes = () => {
  // const [user, setUser] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem('user'))
  //   } catch (error) {
  //     return null
  //   }
  // })
  const handleLogin = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
    // setUser(JSON.parse(localStorage.getItem('user')))
  }
  const element = useRoutes([
    { path: '/login', element: <SignIn onAuthButtonClick={handleLogin} /> },
    { path: '/signup', element: <SignUp /> },
    {
      element: <ProtectedRoute isAllowed={Boolean(JSON.parse(localStorage.getItem('user')))} />,
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