import { useDispatch, useSelector } from 'react-redux'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as S from './Track.styles'
import ButtonSVG from '../buttonSVG/ButtonSVG'
import { timePresent } from '../../utils/utils'
import { setCurrentTruck } from '../../store/slices/tracksSlice'

export default function TrackListContent({ loading }) {
  const dispatch = useDispatch()
  const tracks = useSelector((state) => state.tracks.allTracks)
  const currentTrack = useSelector((state) => state.tracks.currentTrack)
  const isPlaying = useSelector((state) => state.tracks.isPlaying)

  function GetTrack(prop) {
    return (
      <S.playlistItem
        key={prop ? prop.id : Math.random()}
        onClick={
          prop
            ? () => {
                dispatch(setCurrentTruck(prop.id))
              }
            : null
        }
      >
        <SkeletonTheme baseColor="#313131" highlightColor="#444" height={19}>
          <S.playlistTrack>
            <S.trackTitle>
              <S.trackTitleImage>
                {!loading &&
                  (currentTrack && currentTrack.id === prop.id ? (
                    <S.playingDot $playing={isPlaying} />
                  ) : (
                    <S.trackTitleSvg alt="music">
                      <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </S.trackTitleSvg>
                  ))}

                {loading && <Skeleton width={51} height={51} />}
              </S.trackTitleImage>
              <div>
                <S.trackTitleLink>
                  {!loading ? prop.name : <Skeleton width={356} />}
                  {prop?.remix ? (
                    <S.trackTitleSpan>({prop.remix})</S.trackTitleSpan>
                  ) : (
                    ''
                  )}
                </S.trackTitleLink>
              </div>
            </S.trackTitle>
            <S.trackAuthor>
              <S.trackAuthorLink>
                {!loading ? prop.author : <Skeleton width={271} />}
              </S.trackAuthorLink>
            </S.trackAuthor>
            <S.trackAlbum>
              <S.trackAlbumLink>
                {!loading ? prop.album : <Skeleton width={250} />}
              </S.trackAlbumLink>
            </S.trackAlbum>
            <S.trackLikeTime>
              {!loading ? (
                <>
                  <ButtonSVG name="like" modification="tracklike" />
                  <S.trackTimeText>
                    {timePresent(prop.duration_in_seconds)}:
                  </S.trackTimeText>
                </>
              ) : (
                <Skeleton width={50} />
              )}
            </S.trackLikeTime>
          </S.playlistTrack>
        </SkeletonTheme>
      </S.playlistItem>
    )
  }
  return !loading
    ? tracks.map((track) => GetTrack(track))
    : Array(10)
        .fill()
        .map(() => GetTrack())
}