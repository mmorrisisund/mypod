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
  const { data: itunesResults } = await axios.get(`${itunesUrl}${req.url}`)
  const itunesInfo = itunesResults.results[0]

  const { data: rawRss } = await axios.get(itunesInfo.feedUrl)
  const rssFeed = await parser.parseString(rawRss)

  res.json({ itunesInfo, rssFeed })
})

module.exports = router
