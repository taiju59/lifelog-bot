import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import controllers from './controllers'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/webhook/line', (req, res) => {
  controllers.line(req.body).then((result) => {
    res.send(result)
  })
})

const port = config.app.port
app.listen(port, () => {
  console.log('server starting on PORT:' + port)
})

// promiceでのエラー内容を見られるようにする
process.on('unhandledRejection', console.dir)