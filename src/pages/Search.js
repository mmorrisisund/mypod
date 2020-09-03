import React, { useState } from 'react'
import axios from 'axios'

import { searchUrl } from '../util/url'
import { SearchForm } from '../components/SearchForm'
import { PodcastList } from '../components/PodcastList'

export const Search = () => {
  const [searchResults, setSearchResults] = useState(undefined)

  const handleOnSearch = async term => {
    const { data } = await axios.get(`${searchUrl}${term}`)
    setSearchResults(data.results)
  }

  return (
    <section className='searchPage'>
      <SearchForm onSearch={handleOnSearch} />

      {searchResults && <PodcastList podcasts={searchResults} />}
    </section>
  )
}
