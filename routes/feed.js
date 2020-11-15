const express = require('express')
const axios = require('axios')
const moment = require('moment')
const app = express()
const cambridge311 = require('../models/cambridge311')
const cambridgeReddit = require('../models/cambridgeReddit')
const utils = require('../models/utils')

module.exports = (app) => {
  app.get('/feed', async(req, res) => {
    let cambridgeRedditData = cambridgeReddit()
    let cambridge311Data = cambridge311()

    let feed = await Promise.all([cambridgeRedditData, cambridge311Data])

    feed = utils.sortRecords([...feed[0], ...feed[1]])

    res.json({
      data: feed
    })
  })
}
