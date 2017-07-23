const request = require('request')

const LIME_API_ROOT_URL ='https://api.line.me/v2/bot/'

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
        bearer: process.env.LINE_CHANNEL_ACCESS_TOKEN
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
        bearer: process.env.LINE_CHANNEL_ACCESS_TOKEN
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
        bearer: process.env.LINE_CHANNEL_ACCESS_TOKEN
      },
      json: true
    }
    request(options, (err, response, body) => {
      console.log(JSON.stringify(response))
    })
  }

}
module.exports = new Line()