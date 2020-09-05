import React, { useState } from 'react'

import style from './style.module.css'

export const SearchForm = ({ onSearch }) => {
  const [term, setTerm] = useState('')

  const handleOnSubmit = e => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <form onSubmit={handleOnSubmit} className={style.searchForm}>
      <input
        className={style.searchBox}
        type='text'
        placeholder='Enter a search term...'
        value={term}
        onChange={({ target }) => setTerm(target.value)}
      />
      <button className={style.searchButton} type='submit'>
        Search
      </button>
    </form>
  )
}
