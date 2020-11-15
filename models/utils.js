const express = require('express')
const moment = require('moment')

const enrichRecords = (records, source, timeStampKey) => {
  records.forEach((record) => {
    let timestamp = moment(record[timeStampKey])

    record["momentObj"] = timestamp
    record["displayTimestamp"] = timestamp.format('dddd, MMM Do @ h:mm a')
    record["source"] = source
  })
  return records
}

const compareRecords = (record1, record2) => {
  if (record1.momentObj > record2.momentObj) return -1
  if (record1.momentObj < record2.momentObj) return 1
  return 0
}

const sortRecords = (records) => {
  return records.sort(compareRecords)
}

module.exports = {
  enrichRecords,
  sortRecords
}
