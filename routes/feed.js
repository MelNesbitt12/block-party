const express = require('express')
const axios = require('axios')
const moment = require('moment')
const app = express()
const cambridge311 = require('../models/cambridge311')
const cambridgeReddit = require('../models/cambridgeReddit')
const somervilleReddit = require('../models/somervilleReddit')
const utils = require('../models/utils')

module.exports = (app) => {
  app.get('/feed', async(req, res) => {
    let cambridgeRedditData = cambridgeReddit()
    let cambridge311Data = cambridge311()
    let somervilleRedditData = somervilleReddit()

    let feed = await Promise.all([cambridgeRedditData, cambridge311Data, somervilleRedditData])

    feed = utils.sortRecords([...feed[0], ...feed[1],...feed[2]])

    res.json({
      data: feed
    })
  })
}
