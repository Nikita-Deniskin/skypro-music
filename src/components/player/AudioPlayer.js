import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import ButtonSVG from '../buttonSVG/ButtonSVG'
import * as S from './Player.styles'

export default function Player({ prop }) {
  return (
    <S.bar>
      <S.barContent>
        <S.barPlayerProgress> </S.barPlayerProgress>
        <S.barPlayerBlock>
          <S.barPlayer>
            <S.playerControls>
              <ButtonSVG name="prev" />
              <ButtonSVG name="play" />
              <ButtonSVG name="next" />
              <ButtonSVG name="repeat" />
              <ButtonSVG name="shuffle" />
            </S.playerControls>
            <S.playerTrackPlay>
              <S.trackPlayContain>
                <SkeletonTheme baseColor="#313131" highlightColor="#444">
                  <S.trackPlayImage>
                    {prop ? (
                      <S.trackPlaySvg alt="music">
                        <use xlinkHref="img/icon/sprite.svg#icon-note" />
                      </S.trackPlaySvg>
                    ) : (
                      <Skeleton width={50} height={50} />
                    )}
                  </S.trackPlayImage>
                  <S.trackPlayAuthor>
                    {prop ? (
                      <S.trackPlayAuthorLink href="http://">
                        {prop.name}
                      </S.trackPlayAuthorLink>
                    ) : (
                      <Skeleton width={50} height={15} />
                    )}
                  </S.trackPlayAuthor>
                  <S.trackPlayAlbum>
                    {prop ? (
                      <S.trackPlayAlbumLink href="http://">
                        {prop.author}{' '}
                      </S.trackPlayAlbumLink>
                    ) : (
                      <Skeleton width={50} height={15} />
                    )}
                  </S.trackPlayAlbum>
                </SkeletonTheme>
              </S.trackPlayContain>
              <S.trackPlayLikeDis>
                <ButtonSVG name="like" />
                <ButtonSVG name="dislike" />
              </S.trackPlayLikeDis>
            </S.playerTrackPlay>
          </S.barPlayer>
          <S.barVolumeBlock>
            <S.volumeContent>
              <ButtonSVG name="volume" />
              <S.volumeProgress>
                <S.volumeProgressLine type="range" name="range" />
              </S.volumeProgress>
            </S.volumeContent>
          </S.barVolumeBlock>
        </S.barPlayerBlock>
      </S.barContent>
    </S.bar>
  )
}