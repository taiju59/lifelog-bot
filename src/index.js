const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/line', (req, res) => {
  res.send('OK')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('server starting on PORT:' + port)
})