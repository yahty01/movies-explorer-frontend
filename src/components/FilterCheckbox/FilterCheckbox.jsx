import './FilterCheckbox.scss';
import React, { useState } from 'react';

function FilterCheckbox({ label, ariaLabel }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <label className='filter-checkbox'>
      <input type='checkbox' className='filter-checkbox__input' checked={isChecked} onChange={handleCheckboxChange} aria-label={ariaLabel} />
      <span className='button filter-checkbox__slider'></span>
      <span className='link filter-checkbox__label'>{label}</span>
    </label>
  );
}

export default FilterCheckbox;