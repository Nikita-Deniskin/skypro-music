import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/context'
import * as S from './main.styles'
import { playLists } from '../../data'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import Sidebar from '../../components/sidebar/Sidebar'
import TrackList from '../../components/traklist/Tracklist'
import { getTracks } from '../../api/api'
import { useFetching } from '../../utils/hooks'

function Main() {
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    navigate('/login', { replace: false })
    localStorage.removeItem('auth')
  }

  const [content, setContent] = useState({})
  // const [loading, setLoading] = useState(true)
  const [currentTrack, setCurrentTruck] = useState(null)
  // const [newError, setNewError] = useState(null)

  const [fetchTracks, loading, error] = useFetching(async () => {
    const response = await getTracks()
    setContent({
      tracklist: response,
      sidebar: playLists,
    })
  })

  useEffect(() => {
    fetchTracks()
  }, [])

  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation logout={logout} />
          {loading && (
            <>
              <TrackList />
              <Sidebar />
              <Player />
            </>
          )}
          {!loading && (
            <>
              <TrackList
                tracks={content.tracklist}
                setTrack={setCurrentTruck}
                error={error}
              />
              {!error && <Sidebar logout={logout} array={content.sidebar} />}
              {currentTrack && (
                <Player prop={currentTrack} setTrack={setCurrentTruck} />
              )}
            </>
          )}
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  )
}

export default Main