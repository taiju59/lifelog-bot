import utils from '../utils'

const MESSAGING_API_URL = 'https://api.line.me/v2/bot/'

export default class LineBot {

  constructor(channelAccessToken, replyToken = null) {
    this._channelAccessToken = channelAccessToken
    this._replyToken = replyToken
  }

  checkHasRepLyToken() {
    return this._replyToken != null
  }

  async reply(messages) {
    if (this._replyToken == null) {
      console.log(Error('replyToken is empty'))
      return
    }
    const result = await this._postMessage('reply', {
      replyToken: this._replyToken,
      messages: messages
    })
    this._replyToken = null // 一度使用したreplyTokenは無効になるため破棄
    return result
  }

  async send(userId, messages) {
    if (Array.isArray(userId)) {
      return await this._multiCast(userId, messages)
    } else if (typeof userId == 'string') {
      return await this._push(userId, messages)
    } else {
      console.log(Error('Invalid type of userId: ' + userId))
    }
  }

  async getProfile(userId) {
    const options = {
      method: 'GET',
      uri: MESSAGING_API_URL + 'profile/' + userId,
      auth: {
        bearer: this._channelAccessToken
      },
      json: true
    }
    return await utils.asyncRequest(options)
  }

  async _multiCast(userIds, messages) {
    return await this._postMessage('multicast', {
      to: userIds,
      messages: messages
    })
  }

  async _push(userId, messages) {
    return await this._postMessage('push', {
      to: userId,
      messages: messages
    })
  }

  async _postMessage(type, body) {
    const options = {
      method: 'POST',
      uri: MESSAGING_API_URL + 'message/' + type,
      body: body,
      auth: {
        bearer: this._channelAccessToken
      },
      json: true
    }
    return await utils.asyncRequest(options)
  }
}
