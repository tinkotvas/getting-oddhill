/* This code proxies the Slack commands via glitch.com for faster responses to avoid the 3000ms timeout problem */
// URL:
// https://handsome-shirt.glitch.me/publishProxy

// import axios from 'axios'
const axios = require('axios')
const express = require('express')
const app = express()

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// Simple in-memory store
const dreams = [
  'Find and count some sheep',
  'Climb a really tall mountain',
  'Wash the dishes'
]

app.get('/dreams', (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post('/dreams', (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

app.post('/publishProxy', (request, response) => {
  const target =
    'https://us-central1-getting-oddhill.cloudfunctions.net/commandPublish'
  let body = request.body
  console.log(body)
  response
    .contentType('json')
    .status(200)
    .send({
      response_type: 'ephemeral',
      text: 'Publishing, your message will be posted momentarily...'
    })
  axios.post(target, body)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
