import './FilterCheckbox.scss';

function FilterCheckbox({ onCheckboxChange, isShortFilmChecked }) {
  const handleChange = (e) => onCheckboxChange(e.target.checked);

  return (
    <label className='filter-checkbox'>
      <input
        type='checkbox'
        onChange={handleChange}
        className='filter-checkbox__input'
        aria-label='Поиск по короткометражкам'
        checked={isShortFilmChecked}
      />
      <span className='button filter-checkbox__slider'></span>
      <span className='link filter-checkbox__label'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
