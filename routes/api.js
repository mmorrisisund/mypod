const express = require('express')

const router = express.Router()

router.get('/search', (req, res) => {
  res.send(req.query)
})

module.exports = router
