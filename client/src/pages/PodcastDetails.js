import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { apiUrl } from '../util/url'
import { removeTags } from '../util/helperFns'

export const PodcastDetails = () => {
  const { podcastId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [podcast, setPodcast] = useState(undefined)
  const [rssFeed, setRssFeed] = useState(undefined)

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

  return (
    <section>
      {isLoading ? (
        'Loading...'
      ) : podcast ? (
        <div>
          <img src={podcast.artworkUrl600} alt='cover' />
          <h1>{podcast.collectionName}</h1>
          {removeTags(rssFeed?.description?.trim())}
          <article>
            <ul>
              {podcast.genres.map((genre, index) => {
                if (!genre.toLowerCase().includes('podcast')) {
                  return <li key={index}>{genre}</li>
                }
              })}
            </ul>
          </article>
          <article>
            <ul>
              {rssFeed.items.map(episode => {
                return (
                  <li key={episode.guid}>
                    <Link to='#'>{episode.title}</Link>
                  </li>
                )
              })}
            </ul>
          </article>
        </div>
      ) : (
        'nothing for now'
      )}
    </section>
  )
}
