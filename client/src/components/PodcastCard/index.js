import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.css'
export const PodcastCard = ({ podcast }) => {
  return (
    <Link to={`/podcast/${podcast.collectionId}`}>
      <div className={style.podcastCard}>
        <img
          src={podcast.artworkUrl600}
          alt='cover'
          className={style.podcastCardImage}
        />
        <h4 className={style.podcastCardTitle}>{podcast.collectionName}</h4>
      </div>
    </Link>
  )
}
