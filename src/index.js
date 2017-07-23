// import modules
const express = require('express')
const bodyParser = require('body-parser')
const line = require('./utils/line.js')

// create a new express server
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.post('/line', (req, res) => {
  console.log('line')
  const replyToken = req.body.events[0].replyToken
  const messages = [{
    type: 'text',
    text: req.body.events[0].message.text
  }]
  line.reply(replyToken, messages)
  res.send('OK')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('server starting on PORT:' + port)
})