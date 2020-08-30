import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { apiUrl } from '../util/url'
import { removeTags } from '../util/helperFns'
import { PlayerContext } from '../context/PlayerContext'
import { EpisodeDetails } from '../components/EpisodeDetail'
import { EpisodeList } from '../components/EpisodeList'

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
  }, [podcastId])

  const handleOnReturnRequest = () => setSelectedEpisode(undefined)

  return (
    <section style={{ minHeight: '100vh', margin: 110 }}>
      {isLoading ? (
        'Loading...'
      ) : (
        <div>
          <div
            className='titleCard'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem'
            }}
          >
            <img
              src={podcast.artworkUrl600}
              alt='cover'
              style={{
                width: 300,
                height: 300,
                border: '2px solid var(--mainWhite)',
                boxShadow: 'var(--lightShadow)'
              }}
            />
            <div
              className='cardText'
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '2rem'
              }}
            >
              <h1 style={{ fontSize: 48, color: 'var(--primaryColor' }}>
                {podcast.collectionName}
              </h1>
              <hr />
            </div>
          </div>
          <article style={{ margin: '2rem 0' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              {removeTags(rssFeed.description.trim())}
            </p>
            <ul style={{ display: 'flex' }}>
              {podcast.genres.map((genre, index) => {
                if (!genre.toLowerCase().includes('podcast')) {
                  return (
                    <li
                      key={index}
                      style={{
                        margin: '0px 0.5rem',
                        backgroundColor: 'var(--secondaryColor)',
                        padding: ' 0.5rem',
                        borderRadius: '20px',
                        color: 'var(--mainWhite)',
                        boxShadow: 'var(--lightShadow)'
                      }}
                    >
                      {genre}
                    </li>
                  )
                }
              })}
            </ul>
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
