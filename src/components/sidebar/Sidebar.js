import { NavLink, useNavigate } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as S from './Sidebar.styles'

export default function Sidebar({ array }) {
  const navigate = useNavigate()
  const listItems = array
    ? array.map((item) => (
        <S.sidebarItem key={item.id}>
          <NavLink to={`/category/${item.id}`}>
            <S.sidebarImg src={item.src} alt="day's playlist" />
          </NavLink>
        </S.sidebarItem>
      ))
    : Array(3)
        .fill()
        .map(() => (
          <S.sidebarItem key={Math.random()}>
            <Skeleton />
          </S.sidebarItem>
        ))
  return (
    <S.mainSidebar className="sidebar">
      <S.sidebarPersonal>
        <S.sidebarPersonalName>Sergey.Ivanov</S.sidebarPersonalName>
        <S.sidebarIcon>
          <svg
            alt="logout"
            onClick={() => {
              localStorage.removeItem('user')
              navigate('/login', { replace: true })
            }}
          >
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </S.sidebarIcon>
      </S.sidebarPersonal>
      <S.sidebarBlock>
        <SkeletonTheme
          baseColor="#313131"
          highlightColor="#444"
          height={150}
          width={250}
        >
          <S.sidebarList>{listItems}</S.sidebarList>
        </SkeletonTheme>
      </S.sidebarBlock>
    </S.mainSidebar>
  )
}