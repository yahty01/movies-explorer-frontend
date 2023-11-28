import "./SearchForm.scss";

function SearchForm({ onSearch, searchQuery, setSearchQuery, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="search" aria-label="Поисковая строка">
      <div className="search__container">
        <form
          className="searchForm"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            autoFocus
            autoComplete="nope"
            minLength="2"
            placeholder="Фильм"
            className="searchForm__field"
            required
          />

          <hr className="searchForm-line" />
          <button
            type="submit"
            className="button searchForm__button"
            aria-label="Запустить поиск"
          ></button>
          {children}
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
