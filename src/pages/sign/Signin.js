import { useNavigate } from 'react-router-dom'
import * as S from './signin.styles'

export default function SignIn({ onAuthButtonClick }) {
  const navigate = useNavigate()
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
              className="password"
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <S.modalBtnEnter
              type="button"
              onClick={() => {
                onAuthButtonClick('UserData')
                navigate('/', { replace: false })
              }}
            >
              Войти
            </S.modalBtnEnter>
            <S.modalBtnSignup
              type="button"
              as="button"
              onClick={() => navigate('/signup', { replace: false })}
            >
              Зарегистрироваться
            </S.modalBtnSignup>
          </S.modalFormLogin>
        </S.modalBlock>
      </S.containerEnter>
    </S.wrapper>
  )
}
export function saveUserToLocalStorage(user) {
  window.localStorage.setItem('user', JSON.stringify(user))
}