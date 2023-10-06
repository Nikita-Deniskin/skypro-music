import { useEffect, useState } from 'react'
import * as S from './main.styles'
import { tracks, playLists } from '../../data'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import Sidebar from '../../components/sidebar/Sidebar'
import TrackList from '../../components/traklist/Tracklist'

function Main() {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setContent({
        tracklist: tracks,
        sidebar: playLists,
        player: tracks[0],
      })
      setLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
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
                <TrackList tracks={content.tracklist} />
                <Sidebar array={content.sidebar} />
                <Player prop={content.player} />
              </>
            )}
          </S.main>
          <footer className="footer" />
        </S.container>
      </S.wrapper>
  )
}

export default Main