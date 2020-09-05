import React, { useContext } from 'react'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

import { searchUrl } from '../util/url'
import { SearchForm } from '../components/SearchForm'
import { PodcastList } from '../components/PodcastList'
import { SearchContext } from '../context/SearchContext'

export const Search = () => {
  const { searchResults, setSearchResults } = useContext(SearchContext)

  const handleOnSearch = async term => {
    try {
      const { data } = await axios({
        url: `${searchUrl}${term}`,
        adapter: jsonpAdapter
      })
      setSearchResults(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='searchPage'>
      <SearchForm onSearch={handleOnSearch} />

      {searchResults && <PodcastList podcasts={searchResults} />}
    </section>
  )
}
