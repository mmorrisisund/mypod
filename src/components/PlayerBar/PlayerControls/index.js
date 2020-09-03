import React, { useContext } from 'react'
import { MdReplay10, MdForward30 } from 'react-icons/md'
import { IconContext } from 'react-icons'

import style from './style.module.css'
import { PlayerContext } from '../../../context/PlayerContext'
import { PlayButton } from '../../PlayButton'

export const PlayerControls = ({ onSeekBackward, onSeekForward }) => {
  const { isPlaying, setIsPlaying, episode } = useContext(PlayerContext)
  const iconStyle = { style: { width: '100%', height: '100%' } }
  const disabledStyle = episode ? {} : { color: 'var(--mainGrey)' }

  const handlePlayClick = () => setIsPlaying(playing => !playing)
  const handleOnReplayClick = () => onSeekBackward()
  const handleOnForwardClick = () => onSeekForward()

  return (
    <div className={style.playerControls}>
      <IconContext.Provider value={iconStyle}>
        <button
          className={style.controlButtonSecondary}
          onClick={handleOnReplayClick}
          disabled={!episode}
          style={disabledStyle}
        >
          <MdReplay10 />
        </button>
        <PlayButton
          onClick={handlePlayClick}
          disabled={!episode}
          isPlaying={isPlaying}
        />

        <button
          className={style.controlButtonSecondary}
          onClick={handleOnForwardClick}
          disabled={!episode}
          style={disabledStyle}
        >
          <MdForward30 />
        </button>
      </IconContext.Provider>
    </div>
  )
}
