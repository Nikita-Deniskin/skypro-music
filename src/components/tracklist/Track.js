import './Track.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function GetTrack(prop) {
  return (
    <li key={prop ? prop.id : Math.random()} className="playlist__item">
      <SkeletonTheme baseColor="#313131" highlightColor="#444" height={50}>
        <div className="playlist__track track">
          <div className="track__title">
            <div className="track__title-image">
              {prop ? (
                <svg className="track__title-svg" alt="music">
                  <use xlinkHref="img/icon/sprite.svg#icon-note" />
                </svg>
              ) : (
                <Skeleton width={40} />
              )}
            </div>
            <div className="track__title-text">
              <a className="track__title-link" href="http://">
                {prop ? prop.name : <Skeleton width={360} />}
                {prop?.remix ? (
                  <span className="track__title-span">({prop.remix})</span>
                ) : (
                  ''
                )}
              </a>
            </div>
          </div>
          <div className="track__author">
            <a className="track__author-link" href="http://">
              {prop ? prop.author : <Skeleton width={300} />}
            </a>
          </div>
          <div className="track__album">
            <a className="track__album-link" href="http://">
              {prop ? prop.album : <Skeleton width={240} />}
            </a>
          </div>
          <div className="track__time">
            {prop ? (
              <>
                <svg className="track__time-svg" alt="time">
                  <use xlinkHref="img/icon/sprite.svg#icon-like" />
                </svg>
                <span className="track__time-text">{prop.time}</span>
              </>
            ) : (
              <Skeleton width={50} />
            )}
          </div>
        </div>
      </SkeletonTheme>
    </li>
  )
}
