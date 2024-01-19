import { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { setAllTracks } from '../../store/slices/tracksSlice'

function Main() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setIsAuth } = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    navigate('/login', { replace: false })
    localStorage.removeItem('auth')
  }

  const [content, setContent] = useState({})
  // const [currentTrack, setCurrentTruck] = useState(null)
  const [fetchTracks, loading, error] = useFetching(async () => {
    const response = await getTracks()
    setContent({
      // tracklist: response,
      sidebar: playLists,
    })
    // console.log(response);
    dispatch(setAllTracks(await response))
  })
  const currentTrack = useSelector(state => state.tracks.currentTrack)
// console.log(content);

  useEffect(() => {
    fetchTracks()
  }, [])

  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation logout={logout} />
          <TrackList
          loading={loading}
            // tracks={content.tracklist}
            // setTrack={setCurrentTruck}
            error={error}
          />
          <Sidebar logout={logout} array={content.sidebar} error={error} />
          {(currentTrack || loading) && (
            <Player currentTrack={currentTrack} loading={loading}/>
          )}
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  )
}

export default Main