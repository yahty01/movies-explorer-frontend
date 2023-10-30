import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.scss';

function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <section className='search' aria-label='Поисковая строка'>
      <div className='search__container'>
        <form className='searchForm' autoComplete='off' onSubmit={handleSubmit}>
          <input
            type='text'
            autoComplete='off'
            minLength='2'
            placeholder='Фильм'
            className='searchForm__field'
            required
          />
          <hr className='searchForm-line' />
          <button type='submit' className='button searchForm__button' aria-label='Запустить поиск'></button>
          <FilterCheckbox label="Короткометражки" ariaLabel="Поиск по короткометражкам" />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;