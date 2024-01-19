import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '../../App.styles'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import Err404 from '../../components/404/404'
import Sidebar from '../../components/sidebar/Sidebar'
import { AuthContext } from '../../components/context/context'



export const NotFound = () => {
    const navigate = useNavigate()
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const logout = () => {if (isAuth) {
    setIsAuth(false)
    navigate('/login', { replace: false })
    localStorage.removeItem('auth')
  }}

return(
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation logout={logout} />
          <Err404 />
          <Sidebar logout={logout} />

          <Player loading />
        </S.main>
      </S.container>
    </S.wrapper>
  )
}