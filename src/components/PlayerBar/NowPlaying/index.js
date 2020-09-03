import React from 'react'

import style from './style.module.css'

export const NowPlaying = ({ podcast, episode }) => {
  return podcast && episode ? (
    <div className={style.nowPlaying}>
      <img
        className={style.nowPlayingImage}
        src={podcast.artworkUrl100}
        alt='cover'
      />
      <div className={style.nowPlayingInfo}>
        <h4 className={style.nowPlayingTitle}>{episode.title}</h4>
        <p>{podcast.collectionName}</p>
      </div>
    </div>
  ) : null
}
