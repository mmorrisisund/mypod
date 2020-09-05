import React, { useState } from 'react'

export const SearchContext = React.createContext({})

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState()

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  )
}
