import * as S from './ButtonSVG.styles'

export default function ButtonSVG({ name, click, modification, isActive }) {
  return (
    <S.BtnDiv
      onClick={(e) => {
        e.stopPropagation()
        // setIsActive(!isActive);
        click();
      }}
      $style={modification || name}
    >
      <S.BtnSvg $style={modification || name} alt={name} $active={isActive}>
        <use xlinkHref={`img/icon/sprite.svg#icon-${name}`} />
      </S.BtnSvg>
    </S.BtnDiv>
  )
}