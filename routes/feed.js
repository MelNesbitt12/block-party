const express = require('express')
const app = express()
const axios = require('axios')
const moment = require('moment')
const feedRecords = require('../models/feedRecords');

// ADD POLLING FOR PRODUCTION - periodic check for new data to be served to client
module.exports = async (app) => {
  const feed = await feedRecords.getData()
  app.get('/feed', (req, res) => {
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let pageStart = (page - 1) * limit
    let pageEnd = page * limit

    const feedPage = feed.slice(pageStart, pageEnd)

    res.json({
      data: feedPage
    })
  })
}
