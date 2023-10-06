import * as S from './Tracklist.styles'
import GetTrack from './Track'
import Filter from '../filter/Filter'

export default function TrackList({ tracks, title }) {
  return (
    <S.mainCentalBlock>
      <S.centalBlockSearch className="search">
        <S.searchSvg>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </S.searchSvg>
        <S.searchText
          className="search__text"
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </S.centalBlockSearch>
      <S.centalBlockH2>{title || 'Треки'}</S.centalBlockH2>
      {!title &&(<Filter />)}
      <S.centalBlockContent>
        <S.contentTitle className="playlist-title">
          <S.playlistTitleCol01>Трек</S.playlistTitleCol01>
          <S.playlistTitleCol02>ИСПОЛНИТЕЛЬ</S.playlistTitleCol02>
          <S.playlistTitleCol03>АЛЬБОМ</S.playlistTitleCol03>
          <S.playlistTitleCol04>
            <S.playlistTitleSvg alt="time">
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </S.playlistTitleSvg>
          </S.playlistTitleCol04>
        </S.contentTitle>
        <S.contentPlaylist className="playlist">
          {tracks
            ? tracks.map((track) => GetTrack(track))
            : Array(10)
                .fill()
                .map(() => GetTrack())}
        </S.contentPlaylist>
      </S.centalBlockContent>
    </S.mainCentalBlock>
  )
}