import { useEffect, useState } from 'react'
import * as S from './main.styles'
import { playLists } from '../../data'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import Sidebar from '../../components/sidebar/Sidebar'
import TrackList from '../../components/traklist/Tracklist'
import { getTracks } from '../../api'
import { useFetching } from '../../utils/hooks'

function Main() {
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
          <Navigation />
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
              {!error && <Sidebar array={content.sidebar} />}
              {currentTrack && <Player prop={currentTrack} />}
            </>
          )}
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  )
}

export default Main
