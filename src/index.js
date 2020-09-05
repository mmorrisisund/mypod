import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import { UserProvider, PlayerProvider, SearchProvider } from './context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SearchProvider>
        <UserProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </UserProvider>
      </SearchProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
