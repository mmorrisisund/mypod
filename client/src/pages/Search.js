import React, { useState } from 'react'
import axios from 'axios'

import { SearchForm } from '../components/SearchForm'
import { PodcastList } from '../components/PodcastList'

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

      <PodcastList podcasts={searchResults} />
    </section>
  )
}
