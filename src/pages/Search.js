import React, { useState } from 'react'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

import { searchUrl } from '../util/url'
import { SearchForm } from '../components/SearchForm'
import { PodcastList } from '../components/PodcastList'

export const Search = () => {
  const [searchResults, setSearchResults] = useState(undefined)

  const handleOnSearch = async term => {
    const { data } = await axios({
      url: `${searchUrl}${term}`,
      adapter: jsonpAdapter
    })
    setSearchResults(data.results)
  }

  return (
    <section className='searchPage'>
      <SearchForm onSearch={handleOnSearch} />

      {searchResults && <PodcastList podcasts={searchResults} />}
    </section>
  )
}
