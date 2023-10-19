import { useRef, useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import ButtonSVG from '../buttonSVG/ButtonSVG'
import { ProgressBar } from './ProgressBar'
import { VolumeRange } from '../volumeRange/volumeRange'
import * as S from './Player.styles'

export default function Player({ prop, setTrack }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef()
  const handleStart = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }
  const handleStop = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }
  const togglePlay = isPlaying ? handleStop : handleStart

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }
  const onTimeUpdate = () => {
    setTimeProgress(audioRef.current.currentTime)
  }
  const [isCycled, setIsCycled] = useState(true)
  const toggleCycling = () => {
    setIsCycled(!isCycled)
    audioRef.current.loop = isCycled
    // console.log(isCycled)
  }

  useEffect(() => {
    if (prop) {
      handleStart()
      audioRef.current.onended = () => {
        setTrack(null)
        setIsPlaying(false)
      }
    }
  }, [prop, setTrack])

  return (
    <S.bar>
      <S.barContent>
        {prop && (
          <audio
            ref={audioRef}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            src={prop.track_file}
          />
        )}
        <ProgressBar {...{ duration, timeProgress, audioRef }} />
        <S.barPlayerBlock>
          <S.barPlayer>
            <S.playerControls>
              <ButtonSVG
                name="prev"
                click={() => {
                  alert('Еще не реализовано')
                }}
              />
              <ButtonSVG
                click={togglePlay}
                name={isPlaying ? 'pause' : 'play'}
              />
              <ButtonSVG
                name="next"
                click={() => {
                  alert('Еще не реализовано')
                }}
              />
              <ButtonSVG name="repeat" click={toggleCycling} active />
              <ButtonSVG
                name="shuffle"
                click={() => {
                  alert('Еще не реализовано')
                }}
              />
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
                        {prop.author}
                      </S.trackPlayAlbumLink>
                    ) : (
                      <Skeleton width={50} height={15} />
                    )}
                  </S.trackPlayAlbum>
                </SkeletonTheme>
              </S.trackPlayContain>
              <S.trackPlayLikeDis>
                <ButtonSVG
                  name="like"
                  click={() => {
                    alert('Еще не реализовано')
                  }}
                />
                <ButtonSVG
                  name="dislike"
                  click={() => {
                    alert('Еще не реализовано')
                  }}
                />
              </S.trackPlayLikeDis>
            </S.playerTrackPlay>
          </S.barPlayer>
          <S.barVolumeBlock>
            <S.volumeContent>
              <ButtonSVG
                name="volume"
                click={() => {
                  alert('Еще не реализовано')
                }}
              />
              <S.volumeProgress>
                {/* <S.volumeProgressLine type="range" name="range" /> */}
                {prop && <VolumeRange audioRef={audioRef} />}
              </S.volumeProgress>
            </S.volumeContent>
          </S.barVolumeBlock>
        </S.barPlayerBlock>
      </S.barContent>
    </S.bar>
  )
}