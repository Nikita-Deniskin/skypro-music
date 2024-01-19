import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterCategory from './FilterButton'
import { selectFilterItem } from '../../store/slices/tracksSlice'
// import MySelect from './select'
import * as S from './filter.styles'

export default function Filter({ tracks }) {
  const [activeCategory, setActiveCategory] = useState('')
  const dispatch = useDispatch()
  const selectedFilterItems = useSelector(
    (state) => state.tracks.selectedFilterItems
  )

  return (
    <S.centerblockFilter>
      <S.filterTitle>Искать по:</S.filterTitle>
      <FilterCategory
        title="исполнителю"
        content={Array.from(new Set(tracks.map((track) => track.author)))
          .sort()
          .map((author) => (
            <S.filterItem
              key={author}
              $isSelected={selectedFilterItems.authors.includes(author)}
              onClick={() => dispatch(selectFilterItem({ authors: author }))}
            >
              {author}
            </S.filterItem>
          ))}
        isActive={activeCategory}
        setActive={setActiveCategory}
        selected={selectedFilterItems.authors.length}
      />
      {/* <MySelect defaultValue="исполнителю" options={tracks}> </MySelect> */}
      <FilterCategory
        title="году выпуска"
        isActive={activeCategory}
        setActive={setActiveCategory}
        selected={(selectedFilterItems.sort === 'По умолчанию')? false : 1}
        content={['По умолчанию', 'Сначала новые', 'Сначала старые'].map(
          (item) => (
            <S.filterItem
              key={item}
              onClick={() => dispatch(selectFilterItem({ sort: item }))}
              $isSelected={selectedFilterItems.sort.includes(item)}
            >
              {item}
            </S.filterItem>
          )
        )}
      />
      <FilterCategory
        title="жанру"
        isActive={activeCategory}
        setActive={setActiveCategory}
        content={Array.from(new Set(tracks.map((track) => track.genre)))
          .sort()
          .map((genre) => (
            <S.filterItem
              key={genre}
              $isSelected={selectedFilterItems.genres.includes(genre)}
              onClick={() => dispatch(selectFilterItem({ genres: genre }))}
            >
              {genre}
            </S.filterItem>
          ))}
        selected={selectedFilterItems.genres.length}
      />
    </S.centerblockFilter>
  )
}