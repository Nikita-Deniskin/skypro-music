import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../context/context'
import { setCurrentTruck } from '../../store/slices/tracksSlice'
import * as S from './Tracklist.styles'
import Filter from '../filter/Filter'
import { ListItem } from './Track'



const TrackList = ({ title, tracks, error, isLoading }) => {
  const { isAuth } = useContext(AuthContext)
  const dispatch = useDispatch()
  const currentTrack = useSelector((state) => state.tracks.currentTrack)
  const isPlaying = useSelector((state) => state.tracks.isPlaying)

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
      {!title && <Filter />}
      <S.centalBlockContent>
        <S.contentTitle className="playlist-title">
          <S.playlistTitleCol01>ТРЕК</S.playlistTitleCol01>
          <S.playlistTitleCol02>ИСПОЛНИТЕЛЬ</S.playlistTitleCol02>
          <S.playlistTitleCol03>АЛЬБОМ</S.playlistTitleCol03>
          <S.playlistTitleCol04>
            <S.playlistTitleSvg alt="time">
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </S.playlistTitleSvg>
          </S.playlistTitleCol04>
        </S.contentTitle>
        <S.contentPlaylist>
          {error && (
            <li key={1} style={{ color: 'red' }}>
              Не удалось загрузить плейлист, попробуйте позже: {error.status}
            </li>
          )}
          {isLoading &&
            Array(10)
              .fill()
              .map(() => <ListItem key={Math.random()} />)}
          {tracks &&
            tracks.map((track) => (
              <ListItem
                key={track.id}
                track={track}
                current={currentTrack}
                playing={isPlaying}
                setCurrent={(id) => dispatch(setCurrentTruck(id))}
                isLiked={
                  title === 'Мои треки'
                    ? true
                    : track.stared_user?.find((item) => item.id === isAuth.id)
                }
              />
            ))}
        </S.contentPlaylist>
      </S.centalBlockContent>
    </S.mainCentalBlock>
  )
}
export default TrackList