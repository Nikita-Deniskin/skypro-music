import { useParams } from 'react-router-dom'
import { playLists } from '../../data'
import * as S from '../main/main.styles'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import TrackList from '../../components/traklist/Tracklist'

function Categories() {
    const params = useParams()
    const currentPlayList = playLists.find((playlist) => playlist.id === Number(params.id))
  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation />
          <TrackList title={currentPlayList.name} />
          <Player />
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  )
}

export default Categories