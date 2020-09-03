import React, { useState } from 'react'

export const PlayerContext = React.createContext()

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [episode, setEpisode] = useState(undefined)
  const [podcast, setPodcast] = useState(undefined)

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        episode,
        setEpisode,
        podcast,
        setPodcast
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
