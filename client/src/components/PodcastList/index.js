import React from 'react'

import style from './style.module.css'
import { PodcastCard } from '../PodcastCard'

export const PodcastList = ({ podcasts }) => {
  return (
    <div>
      <ul className={style.podcastList}>
        {podcasts.map(podcast => (
          <li key={podcast.collectionId}>
            <PodcastCard podcast={podcast} />
          </li>
        ))}
      </ul>
    </div>
  )
}
