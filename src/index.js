// import modules
const express = require('express')
const bodyParser = require('body-parser')
const line = require('./utils/line')
const userService = require('./services/user')

// create a new express server
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.post('/line', (req, res) => {
  console.log('line')
  if (!req.body.events) {
    console.log('No events')
    res.send('NG')
    return
  }
  if (!req.body.events[0].message) {
    console.log('Not message')
    res.send('NG')
    return
  }
  if (!req.body.events[0].message.text) {
    console.log('Not text')
    res.send('NG')
    return
  }
  // reply
  const replyToken = req.body.events[0].replyToken
  const messages = [{
    type: 'text',
    text: req.body.events[0].message.text
  }]
  line.reply(replyToken, messages)
  // register user
  const userId = req.body.events[0].source.userId
  console.log('userId: ' + userId)
  userService.addOrNo(userId)
  res.send('OK')
})

app.post('/multiCast', (req, res) => {
  console.log('multiCast')
  const allUserIds = userService.getAllIds()
  line.multiCast(allUserIds, [{
    type: 'text',
    text: 'multiCast!!!'
  }])
  res.send('OK')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('server starting on PORT:' + port)
})