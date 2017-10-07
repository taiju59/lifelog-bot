import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'

export default class LineBotWrapper {

  constructor(userId, channelAccessToken, replyToken) {
    this.userId = userId
    this.bot = new LineBot(channelAccessToken, replyToken)
  }

  async send(messages) {
    if (this.bot.replyToken != null) {
      await this.bot.reply(messages)
      return
    }
    const user = await services.User.get(this.userId)
    if (user == null) {
      console.log(Error('No user. userId: ' + this.userId))
      return
    }
    const lineUserId = await services.User.getLineUserId(this.userId)
    if (lineUserId == null) {
      console.log(Error('No lineUserId. userId: ' + this.userId))
      return
    }
    await this.bot.send(lineUserId, messages)
  }
}