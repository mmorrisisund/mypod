import React from 'react'

import { ReactComponent as LoadingImage } from './spinner.svg'

export const Loading = ({ content }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem'
      }}
    >
      <h1 style={{ color: 'var(--primaryColor)' }}>{content}</h1>
      <LoadingImage style={{ background: 'transparent' }} />
    </div>
  )
}
