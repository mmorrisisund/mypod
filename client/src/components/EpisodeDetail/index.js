import React, { useContext } from 'react'
import moment from 'moment'

import style from './style.module.css'
import { PlayerContext } from '../../context/PlayerContext'
import { PlayButton } from '../PlayButton'

export const EpisodeDetails = ({ episode, podcast }) => {
  const { setEpisode, setPodcast, setIsPlaying } = useContext(PlayerContext)
  const handleBackButtonClick = () => setEpisode(undefined)
  const playButtonStyle = {
    color: 'var(--primaryColor)',
    boxShadow: 'var(--lightShadow)',
    borderRadius: '100px',
    background: 'var(--offWhite)'
  }

  const handlePlayClick = episode => {
    setIsPlaying(true)
    setEpisode(episode)
    setPodcast(podcast)
  }

  return (
    <article>
      <div className={style.titleSection}>
        <div className={style.titleHeader}>
          <button className={style.backButton} onClick={handleBackButtonClick}>
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
