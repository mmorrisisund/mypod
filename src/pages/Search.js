import React, { useContext } from 'react'
import axios from 'axios'

import { searchUrl } from '../util/url'
import { SearchForm } from '../components/SearchForm'
import { PodcastList } from '../components/PodcastList'
import { SearchContext } from '../context/SearchContext'

export const Search = () => {
  const { searchResults, setSearchResults } = useContext(SearchContext)

  const handleOnSearch = async term => {
    try {
      const {
        data: {
          data: { results }
        }
      } = await axios.get(`${searchUrl}${term}`)

      setSearchResults(results)
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
