import React, { useContext, useState, useRef } from 'react'
import ReactPlayer from 'react-player'

import style from './style.module.css'
import { PlayerContext } from '../../context/PlayerContext'
import { RangeControl } from '../RangeControl'
import { ProgressBar } from '../ProgressBar'
import { PlayerControls } from './PlayerControls'
import { NowPlaying } from './NowPlaying'

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
        <RangeControl
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
