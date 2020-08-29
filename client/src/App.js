import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import { Search, PodcastDetails } from './pages'
import { PlayerBar } from './components/PlayerBar'

function App () {
  return (
    <div>
      <Switch>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/podcast/:podcastId'>
          <PodcastDetails />
        </Route>
      </Switch>
      <PlayerBar />
    </div>
  )
}

export default App
