import { useState } from 'react'
import FilterCategory from './FilterButton'
import { tracks } from '../../data'
import * as S from './filter.styles'

export default function Filter() {
  const [activeCategory, setActiveCategory] = useState('')

  return (
    <S.centerblockFilter>
      <S.filterTitle>Искать по:</S.filterTitle>
      <FilterCategory
        title="исполнителю"
        content={tracks.map((track) => (
          <S.filterItem key={track.id}>{track.author}</S.filterItem>
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
            <S.filterItem key={1}>По умолчанию</S.filterItem>
            <S.filterItem key={2}>Сначала новые</S.filterItem>
            <S.filterItem key={3}>Сначала старые</S.filterItem>
          </>
        }
      />
      <FilterCategory
        title="жанру"
        isActive={activeCategory}
        setActive={setActiveCategory}
        content={tracks.map((track) => (
          <S.filterItem key={track.id}>{track.genre}</S.filterItem>
        ))}
      />
    </S.centerblockFilter>
  )
}