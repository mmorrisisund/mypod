import React, { useContext } from 'react'
import moment from 'moment'

import style from './style.module.css'
import { PlayerContext } from '../../context/PlayerContext'
import { PlayButton } from '../PlayButton'

export const EpisodeDetails = ({ episode, podcast, onReturnRequest }) => {
  const { setEpisode, setIsPlaying } = useContext(PlayerContext)
  const playButtonStyle = {
    color: 'var(--primaryColor)',
    boxShadow: 'var(--lightShadow)',
    borderRadius: '100px',
    background: 'var(--offWhite)'
  }

  const handlePlayClick = episode => {
    setIsPlaying(true)
    setEpisode(episode)
  }

  return (
    <article>
      <div className={style.titleSection}>
        <div className={style.titleHeader}>
          <button className={style.backButton} onClick={onReturnRequest}>
            Back
          </button>
          <h2>{episode.title}</h2>
          <PlayButton
            style={playButtonStyle}
            onClick={() => handlePlayClick(episode)}
          />
        </div>
        <hr className={style.titleBar} />
      </div>
      <h4 className={style.episodeDate}>
        {moment(episode.isoDate).format('MMMM Do YYYY')}
      </h4>
      <p className={style.episodeDescription}>{episode.contentSnippet}</p>
    </article>
  )
}
