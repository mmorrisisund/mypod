import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Search = () => {
  const [term, setTerm] = useState('dollop')
  const [searchResults, setSearchResults] = useState([])

  const handleOnClickSubmit = async () => {
    const { data } = await axios.get(
      `/api/v1/search?media=podcast&term=${term}`
    )
    setSearchResults(data.results)
  }

  return (
    <section>
      <div>
        {/* Search form */}
        <div>
          <label htmlFor='term'>Search Term</label>
          <input
            type='text'
            name='term'
            id='term'
            value={term}
            onChange={({ target }) => setTerm(target.value)}
          />
        </div>
        <button onClick={handleOnClickSubmit}>Submit</button>
      </div>
      <div>
        {/* Results area */}
        <ul>
          {searchResults.map(result => (
            <li key={result.collectionId}>
              <img src={result.artworkUrl60} alt='cover' />
              <Link to={`/podcast/${result.collectionId}`}>
                {result.collectionName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
