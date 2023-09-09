import './CSS/Track.css'

export default function GetTrack(prop) {
    return(
      <li key={prop.id} className="playlist__item">
<div className="playlist__track track">
  <div className="track__title">
    <div className="track__title-image">
      <svg className="track__title-svg" alt="music">
        <use xlinkHref="img/icon/sprite.svg#icon-note" />
      </svg>
    </div>
    <div className="track__title-text">
      <a className="track__title-link" href="http://">
      {prop.name} {prop.remix ? <span className="track__title-span">({prop.remix})</span> : ''}
      </a>
    </div>
  </div>
  <div className="track__author">
    <a className="track__author-link" href="http://">
    {prop.author}
    </a>
  </div>
  <div className="track__album">
    <a className="track__album-link" href="http://">
    {prop.album}
    </a>
  </div>
  <div className="track__time">
    <svg className="track__time-svg" alt="time">
      <use xlinkHref="img/icon/sprite.svg#icon-like" />
    </svg>
    <span className="track__time-text">{prop.time}</span>
  </div>
</div>
</li>
    )
}