import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as S from './Sidebar.styles'
import { AuthContext } from '../context/context'

export default function Sidebar({ array, logout }) {
  const { isAuth, isLoading } = useContext(AuthContext)
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
        <S.sidebarPersonalName>{isLoading? 'сукундочку...' : isAuth.username}</S.sidebarPersonalName>
        <S.sidebarIcon>
          <svg alt="logout" onClick={logout}>
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