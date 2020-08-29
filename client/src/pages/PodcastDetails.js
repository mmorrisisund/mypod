import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { apiUrl } from '../util/url'
import { removeTags } from '../util/helperFns'
import { PlayerContext } from '../context/PlayerContext'

export const PodcastDetails = () => {
  const { podcastId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [podcast, setPodcast] = useState(undefined)
  const [rssFeed, setRssFeed] = useState(undefined)
  const [episode, setEpisode] = useState(undefined)
  const {
    setIsPlaying,
    setEpisode: setPlayerEpisode,
    setPodcast: setPlayerPodcast
  } = useContext(PlayerContext)

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

  const handleEpisodeClick = index => {
    setEpisode(rssFeed.items[index])
  }
  const handleBackButtonClick = () => setEpisode(undefined)

  const handlePlayClick = episode => {
    console.log(episode)
    setIsPlaying(true)
    setPlayerEpisode(episode)
    setPlayerPodcast(podcast)
  }

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
                        margin: '0 0.5rem',
                        backgroundColor: 'var(--secondaryColor)',
                        padding: '0.5rem',
                        borderRadius: '20px',
                        color: 'var(--mainWhite)'
                      }}
                    >
                      {genre}
                    </li>
                  )
                }
              })}
            </ul>
          </article>
          {!episode ? (
            <article>
              <ul>
                {rssFeed.items.map((episode, index) => {
                  return (
                    <li key={episode.guid}>
                      <p onClick={() => handleEpisodeClick(index)}>
                        {episode.title}
                      </p>
                      <button onClick={() => handlePlayClick(episode)}>
                        |&gt;
                      </button>
                    </li>
                  )
                })}
              </ul>
            </article>
          ) : (
            <article>
              <button onClick={handleBackButtonClick}>Back</button>
              <h2>{episode.title}</h2>
              <button onClick={() => handlePlayClick(episode)}>|&gt;</button>
              <h4>{episode.pubDate}</h4>
              <p>{episode.contentSnippet}</p>
            </article>
          )}
        </div>
      )}
    </section>
  )
}
