import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './NavMenu.styles'

export default function Navigation({logout}) {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)
  return (
    <S.mainNav>
      <S.navLogo as="button" onClick={() => navigate('/', { replace: true })}>
        <S.logoImage src="/img/logo.png" alt="logo" />
      </S.navLogo>
      <S.navBurger type="button" onClick={toggleVisibility}>
        <S.burgerLine />
        <S.burgerLine />
        <S.burgerLine />
      </S.navBurger>
      {visible && (
        <S.navMenu>
          <S.menuList>
            <S.menuItem>
              <S.menuLink
                as="button"
                onClick={() => navigate('/', { replace: false })}
              >
                Главное
              </S.menuLink>
            </S.menuItem>
            <S.menuItem>
              <S.menuLink
                as="button"
                onClick={() => navigate('/favorites', { replace: false })}
              >
                Мои треки
              </S.menuLink>
            </S.menuItem>
            <S.menuItem>
              <S.menuLink
                as="button"
                onClick={logout}
              >
                Выйти
              </S.menuLink>
            </S.menuItem>
          </S.menuList>
        </S.navMenu>
      )}
    </S.mainNav>
  )
}