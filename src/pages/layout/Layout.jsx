import { useContext } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthContext } from '../../components/context/context'
import { useFetchAllTrucksQuery } from '../../services/AuthorizedRequestService'
import * as S from '../main/main.styles'
import Navigation from '../../components/navmenu/NavMenu'
import { playLists } from '../../data'
import Sidebar from '../../components/sidebar/Sidebar'
import Player from '../../components/player/AudioPlayer'

const Layout = () => {
  const navigate = useNavigate()
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    navigate('/login', { replace: false })
    localStorage.removeItem('auth')
  }
  const currentTrack = useSelector((state) => state.tracks.currentTrack)
  const { isLoading } = useFetchAllTrucksQuery()

  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation logout={logout} />
          <Outlet />
          <Sidebar logout={logout} array={playLists} loading={isLoading} />
          {(currentTrack || isLoading) && (
            <Player
              currentTrack={currentTrack}
              loading={isLoading}
              isLiked={currentTrack?.stared_user?.find(
                (item) => item.id === isAuth?.id
              )}
            />
          )}
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  )
}
export default Layout