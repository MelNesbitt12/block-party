'use strict'
// Add event listeners here

// converts a 311 record into an HTML card element
const get311Card = (record) => {
  return $(`<div class="card">
    <div class="card-body">
      <h5 class="card-title">${record.issue_type}</h5>
      <p class="card-text">${record.issue_description}</p>
    </div>
  </div>`)
}

// fetches Cambridge 311 data
const getCambridge311 = () => {
  $.ajax({
    url: '/cambridge',
    contentType: "application/json",
    dataType: 'json'
  })
  .then(res => res.records.forEach(record => {
    let newCard = get311Card(record)
    $('.card-list').append(newCard)
  }))
}

window.onload = () => {
  getCambridge311()
}
