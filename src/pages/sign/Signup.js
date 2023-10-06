import * as S from './signin.styles'

export default function SignUp() {
  return (
    <S.wrapper>
      <S.containerEnter>
        <S.modalBlock>
          <S.modalFormLogin action="#">
            <a href="../">
              <S.modalLogo>
                <img src="../img/logo_modal.png" alt="logo" />
              </S.modalLogo>
            </a>
            <S.modalInput
              className="login"
              type="text"
              name="login"
              placeholder="Почта"
            />
            <S.modalInput
              className="password-first"
              type="password"
              name="password"
              placeholder="Пароль"
            />{' '}
            <S.modalInput
              className="password-double"
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <S.modalBtnEnter type="button">
                Зарегистрироваться
            </S.modalBtnEnter>
          </S.modalFormLogin>
        </S.modalBlock>
      </S.containerEnter>
    </S.wrapper>
  )
}