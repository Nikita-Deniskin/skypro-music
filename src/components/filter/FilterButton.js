import * as S from './filterButton.styles'

export default function FilterCategory({
  title,
  content,
  isActive,
  setActive,
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
      {isActive === title && (
        <S.filterPopup className="menu">
          <S.filterList>{content}</S.filterList>
        </S.filterPopup>
      )}
    </S.filterCategory>
  )
}