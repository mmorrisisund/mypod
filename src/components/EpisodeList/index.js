import React, { useContext } from 'react'

import style from './style.module.css'
import { PlayerContext } from '../../context/PlayerContext'
import { PlayButton } from '../PlayButton'

export const EpisodeList = ({ episodes, onEpisodeSelect }) => {
  const { setIsPlaying, setEpisode, podcast, setPodcast } = useContext(
    PlayerContext
  )
  const playButtonStyle = {
    width: 32,
    height: 32,
    boxShadow: 'var(--lightShadow)',
    borderRadius: '100px'
  }

  const handlePlayClick = episode => {
    console.log(episode)
    setIsPlaying(true)
    setEpisode(episode)
    setPodcast(podcast)
  }

  return (
    <article className={style.episodeList}>
      <ul>
        {episodes.map((episode, index) => {
          return (
            <li key={episode.guid} className={style.episodeItem}>
              <p
                className={style.episodeTitle}
                onClick={() => onEpisodeSelect(episode)}
              >
                {episode.title}
              </p>
              <PlayButton
                style={playButtonStyle}
                onClick={() => handlePlayClick(episode)}
              />
            </li>
          )
        })}
      </ul>
    </article>
  )
}
