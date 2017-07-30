const request = require('request')

const LIME_API_ROOT_URL ='https://api.line.me/v2/bot/'
const LINE_CHANNEL_ACCESS_TOKEN =  'Xb7rClhwKbjszeGOymW0Dgj0jPwZJGoZFVIgZ5hFzgq1OWDFS2cYszzYjf9KKyl7wc8iJmFavj2EqGi5yzlqT0Hacgp08NV0b7SRLhs1CvQo6KgLhb8bzmsrFmWj26alGv9mkq07wBLGOdcxGVUi6AdB04t89/1O/w1cDnyilFU='

class Line {

  reply(replyToken, messages) {
    const options = {
      method: 'POST',
      uri: LIME_API_ROOT_URL + 'message/reply',
      body: {
        replyToken: replyToken,
        messages: messages
      },
      auth: {
        bearer: LINE_CHANNEL_ACCESS_TOKEN
      },
      json: true
    }
    request(options, (err, response, body) => {
      console.log(JSON.stringify(response))
    })
  }

  multiCast(userIds, messages) {
    const options = {
      method: 'POST',
      uri: LIME_API_ROOT_URL + 'message/multicast',
      body: {
        to: userIds,
        messages: messages
      },
      auth: {
        bearer: LINE_CHANNEL_ACCESS_TOKEN
      },
      json: true
    }
    request(options, (err, response, body) => {
      console.log(JSON.stringify(response))
    })
  }

  push(userId, messages) {
    const options = {
      method: 'POST',
      uri: LIME_API_ROOT_URL + 'message/push',
      body: {
        to: userId,
        messages: messages
      },
      auth: {
        bearer: LINE_CHANNEL_ACCESS_TOKEN
      },
      json: true
    }
    request(options, (err, response, body) => {
      console.log(JSON.stringify(response))
    })
  }

}
module.exports = new Line()