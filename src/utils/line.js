const request = require('request')

class Line {

  reply(replyToken, messages) {
    const options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      body: {
        replyToken: replyToken,
        messages: messages
      },
      auth: {
        bearer: process.env.LINE_CHANNEL_ACCESS_TOKEN
      },
      json: true
    }
    request(options, (err, response, body) => {
      console.log(JSON.stringify(response))
    })
  }

  push() {

  }
}
module.exports = new Line()