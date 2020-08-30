import React, { useState } from 'react'
import axios from 'axios'

import { SearchForm } from '../components/SearchForm'
import { PodcastCard } from '../components/PodcastCard'

export const Search = () => {
  const [searchResults, setSearchResults] = useState([])

  const handleOnSearch = async term => {
    const { data } = await axios.get(
      `/api/v1/search?media=podcast&term=${term}`
    )
    setSearchResults(data.results)
  }

  return (
    <section className='searchPage'>
      <SearchForm onSearch={handleOnSearch} />

      <div>
        <ul className='searchResults'>
          {searchResults.map(podcast => (
            <li key={podcast.collectionId}>
              <PodcastCard podcast={podcast} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
