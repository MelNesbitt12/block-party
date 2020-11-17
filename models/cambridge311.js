const express = require('express')
const axios = require('axios')
const moment = require('moment')
const utils = require('./utils')

const timeStampKey = 'ticket_created_date_time'
const source = 'Cambridge_311'

const minDate = moment().subtract(7, 'days')
const minDay = minDate.date()
// January = 0 so add 1
const minMonth = minDate.month() + 1
const minYear = minDate.year()

// SQL commands to filter on the ticket_created_date_time column
const dayParam = `date_extract_d(ticket_created_date_time)>=${minDay}`
const monthParam = `date_extract_m(ticket_created_date_time)>=${minMonth}`
const yearParam = `date_extract_y(ticket_created_date_time)>=${minYear}`

const paramSqlStr = `$where=` + [yearParam, dayParam, monthParam].join(' AND ')

// gets Cambridge Open Data
const getData = async () => {
  let result = await axios({
    url: `https://data.cambridgema.gov/resource/2z9k-mv9g.json?${paramSqlStr}`,
    type: "GET",
    data: {
      "app_token" : process.env.CAMBRIDGE_APP_TOKEN
    }
  })
  return utils.enrichRecords(result.data, source, timeStampKey)
}

module.exports = getData
