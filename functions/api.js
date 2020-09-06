const express = require('express')
const serverless = require('serverless-http')
const axios = require('axios')
const Parser = require('rss-parser')

const app = express()

app.get('/.netlify/functions/api/v1/search', searchHandler)
app.get('/.netlify/functions/api/v1/podcast/:id', lookupHandler)
app.get('*', notFoundHandler)

module.exports.handler = serverless(app)

async function searchHandler (req, res) {
  const searchUrl = 'https://itunes.apple.com/search?media=podcast&term='
  const { term } = req.query

  try {
    const { data } = await axios.get(`${searchUrl}${term}`)
    res.status(200).json({ status: 'success', data })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

async function lookupHandler (req, res) {
  const lookupUrl = 'https://itunes.apple.com/lookup?id='
  const { id } = req.params
  const parser = new Parser()

  try {
    const { data: itunesResults } = await axios.get(`${lookupUrl}${id}`)
    const itunesInfo = itunesResults.results[0]

    const { data: rawRss } = await axios.get(itunesInfo.feedUrl)
    const rssFeed = await parser.parseString(rawRss)

    res.status(200).json({ status: 'success', data: { itunesInfo, rssFeed } })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

function notFoundHandler (req, res) {
  res
    .status(404)
    .json({ status: 'error', message: `destination not found - ${req.url}` })
}
