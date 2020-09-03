import React from 'react'

import style from './style.module.css'

export const ProgressBar = ({ progress }) => {
  return (
    <div className={style.progressWrapper}>
      <div className={style.progressBar}>
        <span className={style.progressBarFill} style={{ width: progress }} />
      </div>
    </div>
  )
}
