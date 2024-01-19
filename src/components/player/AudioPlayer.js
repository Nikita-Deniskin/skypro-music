import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import ButtonSVG from '../buttonSVG/ButtonSVG'
import { ProgressBar } from './ProgressBar'
import { VolumeRange } from '../volumeRange/volumeRange'
import * as S from './Player.styles'
import {
  setIsPlaying,
  setCurrentTruck,
  toggleShuffle,
} from '../../store/slices/tracksSlice'

export default function Player({ currentTrack, loading }) {
  const dispatch = useDispatch()
  const isPlaying = useSelector((state) => state.tracks.isPlaying)
  const isShuffled = useSelector((state) => state.tracks.shuffled)

  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef()

  const handleStart = () => {
    audioRef.current.play()
  }
  const handleStop = () => {
    audioRef.current.pause()
  }
  const togglePlay = () => {
    if (isPlaying) {
      handleStop()
    } else {
      handleStart()
    }
    dispatch(setIsPlaying(!isPlaying))
  }

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
  }

  useEffect(() => {
    if (currentTrack) {
      handleStart()
      audioRef.current.onended = () => {
        dispatch(setCurrentTruck('next'))
      }
    }
  }, [currentTrack])

  return (
    <S.bar>
      <S.barContent>
        {currentTrack && (
          <audio
            ref={audioRef}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            src={currentTrack.track_file}
          />
        )}
        <ProgressBar {...{ duration, timeProgress, audioRef }} />
        <S.barPlayerBlock>
          <S.barPlayer>
            <S.playerControls>
              <ButtonSVG
                name="prev"
                click={() => {
                  dispatch(setCurrentTruck('prev'))
                }}
              />
              <ButtonSVG
                click={togglePlay}
                name={isPlaying ? 'pause' : 'play'}
              />
              <ButtonSVG
                name="next"
                click={() => {
                  dispatch(setCurrentTruck('next'))
                }}
              />
              <ButtonSVG name="repeat" click={toggleCycling} />
              <ButtonSVG
                name="shuffle"
                click={() => {
                  dispatch(toggleShuffle(!isShuffled))
                }}
              />
            </S.playerControls>
            <S.playerTrackPlay>
              <S.trackPlayContain>
                <SkeletonTheme baseColor="#313131" highlightColor="#444">
                  <S.trackPlayImage>
                    {loading ? (
                      <Skeleton width={50} height={50} />
                    ) : (
                      <S.trackPlaySvg alt="music">
                        <use xlinkHref="img/icon/sprite.svg#icon-note" />
                      </S.trackPlaySvg>
                    )}
                  </S.trackPlayImage>
                  <S.trackPlayAuthor>
                    {loading ? (
                      <Skeleton width={59} height={15} />
                    ) : (
                      <S.trackPlayAuthorLink href="http://">
                        {currentTrack.name}
                      </S.trackPlayAuthorLink>
                    )}
                  </S.trackPlayAuthor>
                  <S.trackPlayAlbum>
                    {loading ? (
                      <Skeleton width={59} height={15} />
                    ) : (
                      <S.trackPlayAlbumLink href="http://">
                        {currentTrack.author}
                      </S.trackPlayAlbumLink>
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
                {!loading && <VolumeRange audioRef={audioRef} />}
              </S.volumeProgress>
            </S.volumeContent>
          </S.barVolumeBlock>
        </S.barPlayerBlock>
      </S.barContent>
    </S.bar>
  )
}