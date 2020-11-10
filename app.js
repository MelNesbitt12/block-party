const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const config = require('./config/config.js')
const moment = require('moment')

const app = express()

dotenv.config()

// process.env.NODE_ENV = 'development';

app.use(express.static('public'))

// gets Cambridge Open Data
app.get('/cambridge', (req, res) => {

  let minDate = moment().subtract(7, 'days')
  let minDay = minDate.day()
  // January = 0 so add 1
  let minMonth = minDate.month() + 1
  let minYear = minDate.year()

  // SQL commands to filter on the ticket_created_date_time column
  let dayParam = `date_extract_d(ticket_created_date_time)>=${minDay}`
  let monthParam = `date_extract_m(ticket_created_date_time)>=${minMonth}`
  let yearParam = `date_extract_y(ticket_created_date_time)>=${minYear}`

  let paramSqlStr = `$where=` + [yearParam, dayParam, monthParam].join(' AND ')

  // function to sort array of 311 JSON by timestamp
  const compare311 = (json1, json2) => {
    if (json1.momentObj > json2.momentObj) return -1
    if (json1.momentObj < json2.momentObj) return 1
    return 0
  }

  let result = axios({
    url: `https://data.cambridgema.gov/resource/2z9k-mv9g.json?${paramSqlStr}`,
    type: "GET",
    data: {
      "app_token" : process.env.CAMBRIDGE_APP_TOKEN
    }
  })
  .then((result) => {
    let records = result.data.map(json => {
      if (json.issue_description === undefined) json.issue_description = '...'

      let timestamp = moment(json.ticket_created_date_time)
      json["momentObj"] = timestamp
      json["displayTimestamp"] = timestamp.format('dddd, MMM Do @ h:mm a')

      return json
    })
    let newResponse = {
      numRecords: result.data.length,
      records: records.sort(compare311),
    }
    res.json(newResponse)
  })
  .catch((error) => console.error(error))
})

app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`)
})
