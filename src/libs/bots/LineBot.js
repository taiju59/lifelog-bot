import request from 'request'
import utils from '../utils'

export default class LineBot {

  constructor(channelAccessToken, replyToken = null) {
    this._channelAccessToken = channelAccessToken
    this._replyToken = replyToken
  }

  async reply(messages) {
    if (this._replyToken == null) {
      console.log(Error('replyToken is empty'))
      return
    }
    await this._request('message/reply', {
      replyToken: this._replyToken,
      messages: messages
    })
    this._replyToken = null // 一度使用したreplyTokenは無効になるため破棄
  }

  async send(userId, messages) {
    if (Array.isArray(userId)) {
      await this._multiCast(userId, messages)
    } else if (typeof userId == 'string') {
      await this._push(userId, messages)
    } else {
      console.log(Error('Invalid type of userId: ' + userId))
    }
  }

  async getProfile(userId) {
    const options = {
      method: 'GET',
      uri: 'https://api.line.me/v2/bot/profile/' + userId,
      auth: {
        bearer: this._channelAccessToken
      },
      json: true
    }
    const profile = await utils.asyncRequest(options)
    return profile
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
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        uri: 'https://api.line.me/v2/bot/' + uriPath,
        body: body,
        auth: {
          bearer: this._channelAccessToken
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
