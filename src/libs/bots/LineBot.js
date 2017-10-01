import request from 'request'

export default class LineBot {

  constructor(channelAccessToken, replyToken) {
    this.channelAccessToken = channelAccessToken
    this.replyToken = replyToken
  }

  async reply(messages) {
    if (this.replyToken == null) {
      console.log(Error('replyToken is empty'))
      return
    }
    await this._request('message/reply', {
      replyToken: this.replyToken,
      messages: messages
    })
    this.replyToken = null // 一度使用したreplyTokenは無効になるため破棄
  }

  async send(userId, messages) {
    if (Array.isArray(userId)) {
      await this._multiCast(userId, messages)
    } else if (userId instanceof String) {
      await this._push(userId, messages)
    } else {
      console.log(Error('Invalid type of userId: ' + userId))
    }
  }

  async _multiCast(userIds, messages) {
    await this._request('message/multicast', {
      to: userIds,
      messages: messages
    })
  }

  async _push(userId, messages) {
    await this._request('message/push', {
      to: userId,
      messages: messages
    })
  }

  async _request(uriPath, body) {
    new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        uri: 'https://api.line.me/v2/bot/' + uriPath,
        body: body,
        auth: {
          bearer: this.channelAccessToken
        },
        json: true
      }
      request(options, (err, response, body) => {
        if (response.statusCode == 200) {
          resolve(body)
        } else {
          reject(response)
          console.log(Error(JSON.stringify(response)))
        }
      })
    })
  }
}
