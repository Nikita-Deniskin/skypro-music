import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as S from './Track.styles'
import ButtonSVG from '../buttonSVG/ButtonSVG'

export default function GetTrack(prop) {
  return (
    <S.playlistItem key={prop ? prop.id : Math.random()}>
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
              <S.trackTitleLink href="http://">
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
            <S.trackAuthorLink href="http://">
              {prop ? prop.author : <Skeleton width={300} />}
            </S.trackAuthorLink>
          </S.trackAuthor>
          <S.trackAlbum>
            <S.trackAlbumLink href="http://">
              {prop ? prop.album : <Skeleton width={240} />}
            </S.trackAlbumLink>
          </S.trackAlbum>
          <S.trackLikeTime>
            {prop ? (
              <>
                <ButtonSVG name="like" modification="tracklike" />
                <S.trackTimeText>{prop.time}</S.trackTimeText>
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