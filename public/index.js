'use strict'

// pagination
let currentPage = 1
let limit = 15

// converts a 311 record into an HTML card element
const get311Card = (record) => {
  return $(`<div class="card">
    <div class="card-body">
      <div class="card-banner">
        <h5 class="card-title">${record.issue_type}</h5>
        <i class="fa fa-user fa-3x"></i>
      </div>
      <h6 class="card-subtitle mb-2 text-muted">${record.displayTimestamp}</h6>
      <p class="card-text">${record.issue_description}</p>
      <footer class="blockquote-footer text-muted">${record.address}</footer>
    </div>
  </div>`)
}

// converts a Reddit post into an HTML card element
const getRedditCard = (record) => {
  return $(`<div class="card">
    <div class="card-body">
      <div class="card-banner">
        <h5 class="card-title">${record.title}</h5>
        <i class="fa fa-reddit fa-3x"></i>
      </div>
      <h6 class="card-subtitle mb-2 text-muted">${record.displayTimestamp}</h6>
      <p class="card-text">${record.content}</p>
      <footer class="blockquote-footer text-muted">${record.link}</footer>
    </div>
  </div>`)
}

// variable used to prevent infinite scroll from asking for next page of data too rapidly/rendundantly while waiting for response
let pagingInProg = false

// fetches feed data
const getNextPage = (event) => {
  console.log(`Fetching page ${currentPage}`)
  pagingInProg = true
  $.ajax({
    url: `/feed?page=${currentPage}&limit=${limit}`,
    contentType: 'application/json',
    dataType: 'json'
  })
  .then(res => res.data.forEach(record => {
    let source = record.source
    if (source === 'Cambridge_311') {
      let newCard = get311Card(record)
      $('.card-list').append(newCard)
    }
    if (source === 'r/CambridgeMA' || source === 'r/Somerville') {
      let newCard = getRedditCard(record)
      $('.card-list').append(newCard)
    }
  }))
  .then(() => {
    currentPage += 1
    pagingInProg = false
  })
}

// Infinite scroll
$(window).on("scroll", function() {
  let scrollHeight = $(document).height()
  let scrollPos = $(window).height() + $(window).scrollTop()
  // loading new data 300px before bottom of page
  if (!pagingInProg && ((scrollHeight - 300) < scrollPos)) {
    getNextPage()
  }
})


window.onload = () => {
  getNextPage()
}
