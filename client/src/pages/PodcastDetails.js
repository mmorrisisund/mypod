import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { apiUrl } from '../util/url'
import { removeTags } from '../util/helperFns'
import { PlayerContext } from '../context/PlayerContext'
import { PlayButton } from '../components/PlayButton'

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
          {!episode ? (
            <article style={{ margin: '1rem' }}>
              <ul>
                {rssFeed.items.map((currentEpisode, index) => {
                  return (
                    <li
                      key={currentEpisode.guid}
                      style={{
                        backgroundColor: 'var(--mainWhite)',
                        borderBottom: '2px solid var(--mainGrey)',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: '5px',
                        alignItems: 'center'
                      }}
                    >
                      <p
                        onClick={() => handleEpisodeClick(index)}
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        {currentEpisode.title}
                      </p>
                      <PlayButton
                        style={{
                          width: 32,
                          height: 32,
                          boxShadow: 'var(--lightShadow)',
                          borderRadius: '100px'
                        }}
                        onClick={() => handlePlayClick(currentEpisode)}
                      />
                    </li>
                  )
                })}
              </ul>
            </article>
          ) : (
            <article>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <button
                    style={{
                      border: 'none',
                      padding: '1rem',
                      backgroundColor: 'var(--primaryColor)',
                      color: 'var(--mainWhite)',
                      borderRadius: '5px',
                      boxShadow: 'var(--lightShadow)',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase'
                    }}
                    onClick={handleBackButtonClick}
                  >
                    Back
                  </button>
                  <h2>{episode.title}</h2>
                  <PlayButton
                    style={{
                      color: 'var(--primaryColor)',
                      boxShadow: 'var(--lightShadow)',
                      borderRadius: '100px',
                      background: 'var(--offWhite)'
                    }}
                    onClick={() => handlePlayClick(episode)}
                  />
                </div>
                <hr
                  style={{
                    width: '75%',
                    margin: '0 auto',
                    borderColor: 'var(--mainGrey)'
                  }}
                />
              </div>
              <h4 style={{ margin: '2rem' }}>
                {moment(episode.isoDate).format('MMMM Do YYYY')}
              </h4>
              <p
                style={{
                  backgroundColor: 'var(--mainWhite)',
                  padding: '2rem',
                  borderRadius: '5px',
                  borderBottom: '2px solid var(--darkGrey)'
                }}
              >
                {episode.contentSnippet}
              </p>
            </article>
          )}
        </div>
      )}
    </section>
  )
}
