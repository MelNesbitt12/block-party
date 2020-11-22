const express = require('express')
const utils = require('./utils');
const cambridgeReddit = require('./cambridgeReddit.js');
const somervilleReddit = require('./somervilleReddit.js');
const cambridge311 = require('./cambridge311.js');

// function to get all data:
const getData = async () => {
  console.log('Fetching data...')
  let cambridgeRedditData = cambridgeReddit()
  let cambridge311Data = cambridge311()
  let somervilleRedditData = somervilleReddit()

  let feed = await Promise.all([cambridgeRedditData, cambridge311Data, somervilleRedditData])

  feed = utils.sortRecords([...feed[0], ...feed[1],...feed[2]])

  return feed
}

module.exports = {
  getData
}
