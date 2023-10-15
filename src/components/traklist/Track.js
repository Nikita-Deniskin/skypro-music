import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as S from './Track.styles'
import ButtonSVG from '../buttonSVG/ButtonSVG'
import { timePresent } from '../../utils/utils'

export default function TrackListContent({ tracks, setTrack }) {
  function GetTrack(prop) {
    return (
      <S.playlistItem
        key={prop ? prop.id : Math.random()}
        onClick={prop ? () => setTrack(prop) : null}
      >
        <SkeletonTheme baseColor="#313131" highlightColor="#444" height={50}>
          <S.playlistTrack>
            <S.trackTitle>
              <S.trackTitleImage>
                {prop ? (
                  <S.trackTitleSvg alt="music">
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </S.trackTitleSvg>
                ) : (
                  <Skeleton width={40} />
                )}
              </S.trackTitleImage>
              <div>
                <S.trackTitleLink >
                  {prop ? prop.name : <Skeleton width={360} />}
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
                {prop ? prop.author : <Skeleton width={300} />}
              </S.trackAuthorLink>
            </S.trackAuthor>
            <S.trackAlbum>
              <S.trackAlbumLink>
                {prop ? prop.album : <Skeleton width={240} />}
              </S.trackAlbumLink>
            </S.trackAlbum>
            <S.trackLikeTime>
              {prop ? (
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
  return tracks
    ? tracks.map((track) => GetTrack(track))
    : Array(10)
        .fill()
        .map(() => GetTrack())
}