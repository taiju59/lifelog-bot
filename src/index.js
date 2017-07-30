// import modules
const express = require('express')
const bodyParser = require('body-parser')
const exec = require('child_process').exec
const line = require('./utils/line')
const userService = require('./services/user')
const mealController = require('./controllers/meal')
const remindController = require('./controllers/remind')

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
  const eventType = req.body.events[0].type
  if (eventType != 'message' && eventType != 'postback') {
    console.log('Invalid event type')
    return
  }
  const userId = req.body.events[0].source.userId
  let replyText
  if (eventType == 'message' && req.body.events[0].message.type == 'text') {
    replyText = req.body.events[0].message.text
  } else if (eventType == 'postback') {
    const data = req.body.events[0].postback.data
    mealController.answer(userId, data)
    replyText = '回答を受け付けました◎'
  } else {
    console.log('Not text nor postback')
    res.send('NG')
    return
  }
  // reply
  const replyToken = req.body.events[0].replyToken
  const messages = [{
    type: 'text',
    text: replyText
  }]
  line.reply(replyToken, messages)
  // register user
  console.log('userId: ' + userId)
  userService.addOrNo(userId)
  res.send('OK')
})

app.post('/cron', (req, res) => {
  console.log('/cron')
  const command = 'node ' + __dirname + '/cron.js'
  console.log(command)
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    }
    console.log(stdout)
  })
  res.send('OK')
})

app.post('/meal/ask/:type', (req, res) => {
  console.log('/meal/ask')
  const type = req.params.type
  console.log('type: ' + type)
  mealController.ask(type)
  res.send('OK')
})

app.post('/meal/report', (req, res) => {
  console.log('/meal/report')
  mealController.send()
  res.send('OK')
})

app.post('/remind/:type', (req, res) => {
  console.log('/remind')
  const type = req.params.type
  console.log('type: ' + type)
  remindController.ask(type)
  res.send('OK')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('server starting on PORT:' + port)
})