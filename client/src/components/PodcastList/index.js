import React from 'react'

import style from './style.module.css'
import { PodcastCard } from '../PodcastCard'

export const PodcastList = ({ podcasts }) => {
  return (
    <div>
      {podcasts.length > 0 ? (
        <ul className={style.podcastList}>
          {podcasts.map(podcast => (
            <li key={podcast.collectionId}>
              <PodcastCard podcast={podcast} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={style.emptyList}>
          No podcasts could be found. Try another search term.
        </p>
      )}
    </div>
  )
}
