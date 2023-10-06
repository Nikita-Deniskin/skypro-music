import * as S from '../main/main.styles'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import TrackList from '../../components/traklist/Tracklist'

function Favorites() {
  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation />
          <TrackList title="Мои треки" />
          <Player />
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  )
}

export default Favorites