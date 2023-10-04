import './FilterButton.css'

export default function FilterCategory({
  title,
  content,
  isActive,
  setActive,
}) {
  const toggleVisibility = () => setActive(isActive === title ? '' : title)
  return (
    <div className="filter-category">
      <button
        type="button"
        onClick={toggleVisibility}
        className={
          isActive === title
            ? 'filter__button btn_active'
            : 'filter__button _btn-text'
        }
      >
        {title}
      </button>
      {isActive === title && (
        <div className="filter__popup menu">
          <ul className="filter__list">{content}</ul>
        </div>
      )}
    </div>
  )
}