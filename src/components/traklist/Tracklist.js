import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentTruck,
  selectFilterItem,
} from '../../store/slices/tracksSlice'
import * as S from './Tracklist.styles'
import Filter from '../filter/Filter'
import { ListItem } from './Track'

const TrackList = ({ title, allTracks, error, isLoading }) => {
  const userId = useSelector((state) => state.auth.id)
  const dispatch = useDispatch()
  const currentTrack = useSelector((state) => state.tracks.currentTrack)
  const isPlaying = useSelector((state) => state.tracks.isPlaying)
  const filteredTracks = useSelector((state) => state.tracks.filteredTracks)
  const filterIsActive = useSelector((state) => state.tracks.filter)
  const tracks = filterIsActive ? filteredTracks : allTracks

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
          onChange={(e) =>
            dispatch(
              selectFilterItem({
                search: e.target.value === '' ? 'clear' : e.target.value,
              })
            )
          }
        />
      </S.centalBlockSearch>
      <S.centalBlockH2>{title || 'Треки'}</S.centalBlockH2>
      {!title && allTracks && <Filter tracks={allTracks} />}
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
          {tracks?.length > 0 ? (
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
                    : track.stared_user?.find((item) => item.id === userId)
                }
              />
            ))
          ) : (
            <S.filterNotFound>
              Tреков, соответствующих вашему запросу, не найдено
              <img
                src="/img/smile_crying.png"
                alt="crying"
                style={{ width: 52, height: 52 }}
              />
            </S.filterNotFound>
          )}
        </S.contentPlaylist>
      </S.centalBlockContent>
    </S.mainCentalBlock>
  )
}
export default TrackList