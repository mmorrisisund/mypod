const express = require('express')
const axios = require('axios')
const Parser = require('rss-parser')

const { itunesUrl } = require('../util/url')

const router = express.Router()
const parser = new Parser()

router.get('/search', async (req, res) => {
  const { data } = await axios.get(`${itunesUrl}${req.url}`)
  res.json(data)
})

router.get('/lookup', async (req, res) => {
  const { data } = await axios.get(`${itunesUrl}${req.url}`)
  const { data: feedRss } = await axios.get(data.results[0].feedUrl)
  const feed = await parser.parseString(feedRss)
  res.json(feed)
})

module.exports = router
