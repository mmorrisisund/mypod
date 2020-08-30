import React, { useState } from 'react'

import style from './style.module.css'

export const SearchForm = ({ onSearch }) => {
  const [term, setTerm] = useState('dollop')

  return (
    <div className={style.searchForm}>
      <input
        className={style.searchBox}
        type='text'
        placeholder='Enter a search term...'
        value={term}
        onChange={({ target }) => setTerm(target.value)}
      />
      <button className={style.searchButton} onClick={() => onSearch(term)}>
        Search
      </button>
    </div>
  )
}
