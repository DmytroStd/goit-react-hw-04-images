import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdImageSearch } from 'react-icons/md';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (search.trim() === '') {
      toast.error('please write you request');
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}>
          <MdImageSearch style={{ width: 15, height: 15, marginRight: 5 }} />
          <span className={styles.button_label}>search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="search images and photos"
          name="search"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
Searchbar.propTypes = {
  search: PropTypes.string,
};
