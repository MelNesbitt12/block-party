const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const config = require('./config/config.js')
const moment = require('moment')

// require express
const app = express()

// routes
require('./routes/feed')(app)

dotenv.config()

app.use(express.static('public'))

app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`)
})
