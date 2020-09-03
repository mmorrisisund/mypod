import React from 'react'

import style from './style.module.css'

export const GenreList = ({ genres }) => {
  return (
    <ul className={style.genreList}>
      {genres.map((genre, index) =>
        !genre.toLowerCase().includes('podcast') ? (
          <li key={index} className={style.genreListItem}>
            {genre}
          </li>
        ) : null
      )}
    </ul>
  )
}
