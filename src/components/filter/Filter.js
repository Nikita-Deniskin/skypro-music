import { useState } from 'react';
import FilterCategory from './FilterButton';
import { tracks } from '../../data';
import './Filter.css';

export default function Filter() {
  const [activeCategory, setActiveCategory] = useState('')

  return (
    <div className="centerblock__filter ">
      <div className="filter__title">Искать по:</div>
      <FilterCategory
        title="исполнителю"
        content={tracks.map((track) => (
          <li key={track.id} className="filter__item">
            {track.author}
          </li>
        ))}
        isActive={activeCategory}
        setActive={setActiveCategory}
      />
      <FilterCategory
        title="году выпуска"
        isActive={activeCategory}
        setActive={setActiveCategory}
        content={
          <>
            <li key={1} className="filter__item">
              По умолчанию
            </li>
            <li key={2} className="filter__item">
              Сначала новые
            </li>
            <li key={3} className="filter__item">
              Сначала старые
            </li>
          </>
        }
      />
      <FilterCategory
        title="жанру"
        isActive={activeCategory}
        setActive={setActiveCategory}
        content={tracks.map((track) => (
          <li key={track.id} className="filter__item">
            {track.genre}
          </li>
        ))}
      />
    </div>
  )
}