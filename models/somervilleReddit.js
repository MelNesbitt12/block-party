const express = require('express')
const moment = require('moment')
const app = express()
let Parser = require('rss-parser')
let parser = new Parser()
const utils = require('./utils');

const timeStampKey = 'pubDate'
const source = 'r/Somerville'

const getData = async () => {
    let rss = await parser.parseURL('https://www.reddit.com/r/Somerville/top/.rss?t=week')
    return utils.enrichRecords(rss.items, source, timeStampKey)
}

module.exports = getData
