import React from 'react'

import style from './style.module.css'

export const TitleCard = ({ podcast }) => {
  return (
    <div className={style.titleCard}>
      <img
        src={podcast.artworkUrl600}
        alt='cover'
        className={style.titleCardImage}
      />
      <div className={style.titleCardText}>
        <h1 className={style.titleCardHeading}>{podcast.collectionName}</h1>
        <hr />
      </div>
    </div>
  )
}
