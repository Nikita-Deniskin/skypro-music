// import * as React from "react";
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/routes/routes'
import { AuthContext } from './components/context/context'

function App() {
  const [isAuth, setIsAuth] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  setIsAuth(localStorage.getItem("auth")? JSON.parse(localStorage.getItem("auth")) : null)
  setIsLoading(false)
}, [])

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App