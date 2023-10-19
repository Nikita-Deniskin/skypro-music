import { timePresent } from '../../utils/utils'
import * as S from './Player.styles'

export const ProgressBar = ({ audioRef, timeProgress, duration }) => (
  <>
    {}
    <S.currentSpan>
      {timePresent(timeProgress)} / {timePresent(duration)}
    </S.currentSpan>
    <S.barPlayerProgress
      type="range"
      onChange={(e) => {
        audioRef.current.currentTime = e.target.value
      }}
      min={0}
      max={duration}
      value={timeProgress}
      step={0.1}
    />
  </>
)