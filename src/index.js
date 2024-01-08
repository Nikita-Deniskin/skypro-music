import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './index.styles'
import App from './App'
// import SignIn from './components/sign/Signin'
// import SignUp from './components/sign/Signup'
// import Favorites from './pages/favorites/favorites'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle />
      <App />
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals