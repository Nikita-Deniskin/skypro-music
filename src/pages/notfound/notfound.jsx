import * as S from '../../App.styles'
import Navigation from '../../components/navmenu/NavMenu'
import Player from '../../components/player/AudioPlayer'
import Err404 from '../../components/404/404'


export default function NotFound() {
  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation />
          <Err404 />
          <Player />
        </S.main>
      </S.container>
    </S.wrapper>
  )
}