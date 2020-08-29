import React, { useContext, useState, useRef } from 'react'
import ReactPlayer from 'react-player'

import style from './style.module.css'
import { PlayerContext } from '../../context/PlayerContext'
import { InputControl } from '../InputControl'
import { ProgressBar } from '../ProgressBar'
import { PlayerControls } from './PlayerControls'

export const PlayerBar = () => {
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const playerRef = useRef(null)
  const { isPlaying, setIsPlaying, episode, podcast } = useContext(
    PlayerContext
  )

  const handleOnProgress = ({ played }) => {
    setProgress(played)
  }
  const handleOnSeekForward = () => {
    const currentTime = playerRef.current.getCurrentTime()
    const duration = playerRef.current.getDuration()
    const newTime = Math.min(currentTime + 30, duration)
    playerRef.current.seekTo(newTime, 'seconds')
  }
  const handleOnSeekBackward = () => {
    const currentTime = playerRef.current.getCurrentTime()
    const newTime = Math.max(currentTime - 10, 0)
    playerRef.current.seekTo(newTime, 'seconds')
  }
  const handleOnEnded = () => {
    playerRef.current.seekTo(0, 'seconds')
    setIsPlaying(false)
  }
  const handleVolumeOnChange = ({ target }) => {
    setVolume(parseFloat(target.value))
  }

  return (
    <div className={style.playerContainer}>
      <ProgressBar progress={`${progress * 100}%`} />
      <div className={style.playerLeft}>
        <NowPlaying podcast={podcast} episode={episode} />
      </div>
      <div className={style.playerMiddle}>
        <PlayerControls
          onSeekForward={handleOnSeekForward}
          onSeekBackward={handleOnSeekBackward}
        />
      </div>
      <div className={style.playerRight}>
        <InputControl
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeOnChange}
        />
      </div>
      <ReactPlayer
        playing={isPlaying}
        url={episode?.enclosure?.url}
        width='0'
        height='0'
        volume={volume}
        ref={playerRef}
        onProgress={handleOnProgress}
        onEnded={handleOnEnded}
      />
    </div>
  )
}

const NowPlaying = ({ podcast, episode }) => {
  return podcast && episode ? (
    <div className='now-playing' style={{ display: 'flex' }}>
      <img
        src={podcast.artworkUrl100}
        alt='cover'
        style={{ marginRight: '1rem' }}
      />
      <div
        className='now-playing-info'
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
          {episode.title}
        </h4>
        <p>{podcast.collectionName}</p>
      </div>
    </div>
  ) : null
}
