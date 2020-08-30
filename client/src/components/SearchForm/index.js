import React, { useState } from 'react'

export const SearchForm = ({ onSearch }) => {
  const [term, setTerm] = useState('dollop')

  return (
    <div
      style={{
        backgroundColor: 'var(--mainWhite)',
        maxWidth: '75%',
        padding: '3rem',
        borderRadius: 5,
        boxShadow: 'var(--lightShadow)',
        margin: '1rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <input
        type='text'
        placeholder='Enter a search term...'
        value={term}
        onChange={({ target }) => setTerm(target.value)}
        style={{
          padding: '1rem',
          border: '1px solid var(--darkGrey)',
          height: 48,
          fontSize: '1.5rem'
        }}
      />
      <button
        style={{
          border: 'none',
          padding: '1rem',
          backgroundColor: 'var(--primaryColor)',
          color: 'var(--mainWhite)',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          height: 48
        }}
        onClick={() => onSearch(term)}
      >
        Search
      </button>
    </div>
  )
}
