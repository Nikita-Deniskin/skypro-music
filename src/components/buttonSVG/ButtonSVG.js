import * as S from './ButtonSVG.styles'

export default function ButtonSVG({ name, modification }) {
  return (
    <S.BtnDiv $style={modification || name}>
      <S.BtnSvg $style={modification || name} alt={name}>
        <use xlinkHref={`img/icon/sprite.svg#icon-${name}`}/>
      </S.BtnSvg>
    </S.BtnDiv>
  )
}