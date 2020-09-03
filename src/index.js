import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { PlayerProvider } from './context/PlayerContext'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
