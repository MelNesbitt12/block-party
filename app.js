const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const config = require('./config/config.js')

const app = express()

dotenv.config()

// process.env.NODE_ENV = 'development';

app.use(express.static('public'))

// gets Cambridge Open Data
app.get('/cambridge', (req, res) => {
  const limit = 10
  let result = axios({
    url: `https://data.cambridgema.gov/resource/2z9k-mv9g.json?$limit=${limit}`,
    type: "GET",
    data: {
      "app_token" : process.env.CAMBRIDGE_APP_TOKEN
    }
  })
  .then((result) => {
    let newResponse = {
      numRecords: result.data.length,
      records: result.data
    }
    res.json(newResponse)
  })
  .catch((error) => console.error(error))
})

app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`)
})
