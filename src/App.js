import { Provider } from 'react-redux'
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import AppRoutes from './components/routes/routes'
import { AuthContext } from './components/context/context'

function App() {
  const [isAuth, setIsAuth] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsAuth(
      localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : null
    )
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  )
}

export default App