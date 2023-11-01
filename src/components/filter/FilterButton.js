import * as S from './filterButton.styles'

export default function FilterCategory({
  title,
  content,
  isActive,
  setActive,
  selected
}) {
  const toggleVisibility = () => setActive(isActive === title ? '' : title)
  return (
    <S.filterCategory>
      <S.filterButton
        type="button"
        $active={isActive === title}
        onClick={toggleVisibility}
      >
        {title}
      </S.filterButton>
      {selected > 0 && (<S.selectedFilterItems>{selected}</S.selectedFilterItems>)}
      {isActive === title && (
        <S.filterPopup className="menu">
          <S.filterList>{content}</S.filterList>
        </S.filterPopup>
      )}
    </S.filterCategory>
  )
}