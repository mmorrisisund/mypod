import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { apiUrl } from '../util/url'
import { removeTags } from '../util/helperFns'
import { PlayerContext } from '../context/PlayerContext'
import { Loading } from '../components/Loading'
import { EpisodeDetails } from '../components/EpisodeDetail'
import { EpisodeList } from '../components/EpisodeList'
import { GenreList } from '../components/GenreList'
import { TitleCard } from '../components/TitleCard'

export const PodcastDetails = () => {
  const { podcastId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const [rssFeed, setRssFeed] = useState(undefined)
  const [selectedEpisode, setSelectedEpisode] = useState(undefined)
  const { podcast, setPodcast } = useContext(PlayerContext)

  useEffect(() => {
    const getPodcast = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`${apiUrl}/lookup?id=${podcastId}`)

        setPodcast(data.itunesInfo)
        setRssFeed(data.rssFeed)
        setIsLoading(false)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPodcast()
  }, [podcastId, setPodcast])

  const handleOnReturnRequest = () => setSelectedEpisode(undefined)

  return (
    <section style={{ minHeight: '100vh', margin: 110 }}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Loading content='Please wait while we load your podcast.' />
        </div>
      ) : (
        <div>
          <TitleCard podcast={podcast} />

          <article style={{ margin: '2rem 0' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              {removeTags(rssFeed.description.trim())}
            </p>
            <GenreList genres={podcast.genres} />
          </article>

          {!selectedEpisode ? (
            <EpisodeList
              episodes={rssFeed.items}
              onEpisodeSelect={setSelectedEpisode}
            />
          ) : (
            <EpisodeDetails
              podcast={podcast}
              episode={selectedEpisode}
              onReturnRequest={handleOnReturnRequest}
            />
          )}
        </div>
      )}
    </section>
  )
}
