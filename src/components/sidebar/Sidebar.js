import { NavLink } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'
import * as S from './Sidebar.styles'

export default function Sidebar({ array, logout, loading }) {
  const userName = useSelector((state) => state.auth.username)
  return (
    <S.mainSidebar className="sidebar">
      <SkeletonTheme
        baseColor="#313131"
        highlightColor="#444"
        height={150}
        width={250}
      >
        <S.sidebarPersonal>
          <S.sidebarPersonalName>{userName}</S.sidebarPersonalName>
          <S.sidebarIcon>
            <svg alt="logout" onClick={logout}>
              <use xlinkHref="/img/icon/sprite.svg#logout" />
            </svg>
          </S.sidebarIcon>
        </S.sidebarPersonal>
        <S.sidebarBlock>
          <S.sidebarList>
            {loading &&
              Array(3)
                .fill()
                .map(() => (
                  <S.sidebarItem key={Math.random()}>
                    <Skeleton />
                  </S.sidebarItem>
                ))}
            {array &&
              array.map((item) => (
                <S.sidebarItem key={item.id}>
                  <NavLink to={`/category/${item.id}`}>
                    <S.sidebarImg src={item.src} alt={item.name} />
                  </NavLink>
                </S.sidebarItem>
              ))}
          </S.sidebarList>
        </S.sidebarBlock>
      </SkeletonTheme>
    </S.mainSidebar>
  )
}