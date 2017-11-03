import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'

export default class LineBotWrapper {

  constructor(userId, channelAccessToken, replyToken = null) {
    this._userId = userId
    this._bot = new LineBot(channelAccessToken, replyToken)
  }

  async send(messages) {
    if (this._bot.checkHasRepLyToken()) {
      return await this._bot.reply(messages)
    }
    const user = await services.User.get(this._userId)
    if (user == null) {
      console.log(Error('No user. userId: ' + this._userId))
      return
    }
    const lineUserId = await services.User.getLineUserId(this._userId)
    if (lineUserId == null) {
      console.log(Error('No lineUserId. userId: ' + this._userId))
      return
    }
    return await this._bot.send(lineUserId, messages)
  }

  async getProfile() {
    const lineUserId = await services.User.getLineUserId(this._userId)
    const profile = await this._bot.getProfile(lineUserId)
    return profile
  }
}
