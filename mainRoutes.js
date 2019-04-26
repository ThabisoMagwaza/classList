'use strict'
let express = require('express')
let router = express.Router()
let path = require('path')

router.get('/', (req, res) => {
  // res.send('listening from main router')
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

module.exports = router
