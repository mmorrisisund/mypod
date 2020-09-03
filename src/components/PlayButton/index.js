import React from 'react'
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md'
import { IconContext } from 'react-icons'

import css from './style.module.css'

export const PlayButton = ({
  onClick,
  disabled,
  isPlaying,
  style,
  ...otherProps
}) => {
  const disabledColor = disabled ? 'var(--mainGrey)' : 'var(--primaryColor)'
  const iconStyle = { style: { width: '100%', height: '100%' } }

  return (
    <IconContext.Provider value={iconStyle}>
      <button
        className={css.controlButtonPrimary}
        onClick={onClick}
        disabled={disabled}
        style={{ color: disabledColor, ...style }}
        {...otherProps}
      >
        {isPlaying ? <MdPauseCircleFilled /> : <MdPlayCircleFilled />}
      </button>
    </IconContext.Provider>
  )
}
