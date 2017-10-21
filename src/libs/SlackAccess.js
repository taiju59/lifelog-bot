import utils from './utils'

export default class SlackAccess {

  constructor(webhookUrl, channel, botName, botEmoji) {
    this.webhookUrl = webhookUrl
    this.channel = channel
    this.botName = botName
    this.botEmoji = botEmoji
  }

  async postUserMessage(userId, text) {
    const emoji = this._getUserEmoji(userId)
    if (utils.isEmpty(emoji)) return
    await this._post(`User${userId}`, emoji, text)
  }

  async postBotMessage(text) {
    await this._post(this.botName, this.botEmoji, text)
  }

  async _post(userName, iconEmoji, text) {
    const options = {
      method: 'POST',
      uri: this.webhookUrl,
      body: {
        channel: this.channel,
        username: userName,
        text: text,
        icon_emoji: iconEmoji
      },
      json: true
    }
    await utils.asyncRequest(options)
  }

  _getUserEmoji(userId) {
    switch (Number(userId) % 15) {
      case 0:
        return ':dog:'
      case 1:
        return ':cat:'
      case 2:
        return ':mouse:'
      case 3:
        return ':hamster:'
      case 4:
        return ':rabbit:'
      case 5:
        return ':bear:'
      case 6:
        return ':panda_face:'
      case 7:
        return ':koala:'
      case 8:
        return ':tiger:'
      case 9:
        return ':lion_face:'
      case 10:
        return ':cow:'
      case 11:
        return ':pig:'
      case 12:
        return ':frog:'
      case 13:
        return ':octopus:'
      case 14:
        return ':monkey_face:'
      default:
        console.log(Error(`Invalid userId: ${userId}`))
        return
    }
  }
}
