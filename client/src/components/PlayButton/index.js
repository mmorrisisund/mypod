import React from 'react'
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md'
import style from './style.module.css'

export const PlayButton = ({ onClick, disabled, isPlaying, ...otherProps }) => {
  const disabledColor = disabled ? 'var(--mainGrey)' : 'var(--primaryColor)'

  return (
    <button
      className={style.controlButtonPrimary}
      onClick={onClick}
      disabled={disabled}
      style={{ color: disabledColor }}
    >
      {isPlaying ? <MdPauseCircleFilled /> : <MdPlayCircleFilled />}
    </button>
  )
}
