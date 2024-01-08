import { useNavigate } from 'react-router-dom'
import * as S from '../traklist/Tracklist.styles'
import * as Styled from './error.styles'

export default function Err404() {
  const navigate = useNavigate()
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
        />
      </S.centalBlockSearch>
      <Styled.ErrorBlock>
        <Styled.ErrorCode>404</Styled.ErrorCode>
        <Styled.ErrorTitle>
          Страница не найдена
          <img
            src="img/smile_crying.png"
            alt="crying"
            style={{ width: 52, height: 52 }}
          />
        </Styled.ErrorTitle>
        <Styled.ErrorText>
          Возможно, она была удалена <br />
          или перенесена на другой адрес
        </Styled.ErrorText>
        <Styled.ErrorReturnBtn
          type="button"
          onClick={() => navigate('/', { replace: false })}
        >
          Вернуться на главную
        </Styled.ErrorReturnBtn>
      </Styled.ErrorBlock>
    </S.mainCentalBlock>
  )
}