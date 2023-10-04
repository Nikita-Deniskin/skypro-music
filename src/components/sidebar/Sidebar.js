import './Sidebar.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Sidebar({ array }) {
  const listItems = array
    ? array.map((item) => (
        <li key={item.id} className="sidebar__item">
          <a className="sidebar__link" href="http://">
            <img className="sidebar__img" src={item.src} alt="day's playlist" />
          </a>
        </li>
      ))
    : Array(3)
        .fill()
        .map(() => (
          <li key={Math.random()} className="sidebar__item">
            <Skeleton />
          </li>
        ))
  return (
    <div className="main__sidebar sidebar">
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">Sergey.Ivanov</p>
        <div className="sidebar__icon">
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <div className="sidebar__block">
        <SkeletonTheme
          baseColor="#313131"
          highlightColor="#444"
          height={150}
          width={250}
        >
          <ul className="sidebar__list">{listItems}</ul>
        </SkeletonTheme>
      </div>
    </div>
  )
}