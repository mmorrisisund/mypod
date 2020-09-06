const express = require('express')
const serverless = require('serverless-http')
const axios = require('axios')
const Parser = require('rss-parser')

const app = express()

app.get('/api/v1/search', searchHandler)
app.get('/api/v1/podcast/:id', lookupHandler)

module.exports.handler = serverless(app)

async function searchHandler (req, res) {
  const searchUrl = 'https://itunes.apple.com/search?media=podcast&term='
  const { term } = req.body.query

  try {
    const { data } = await axios.get(`${searchUrl}${term}`)
    res.status(200).json({ status: 'success', data })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

async function lookupHandler (req, res) {
  const lookupUrl = 'https://itunes.apple.com/lookup?id='
  const { id } = req.body.params
  const parser = new Parser()

  try {
    const { data: itunesResults } = await axios.get(`${lookupUrl}${id}`)
    const itunesInfo = itunesResults[0]

    const { data: rawRss } = await axios.get(itunesInfo.feedUrl)
    const rssFeed = parser.parseString(rawRss)

    res.status(200).json({ status: 'success', data: { itunesInfo, rssFeed } })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}
