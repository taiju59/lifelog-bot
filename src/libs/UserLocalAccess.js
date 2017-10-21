import utils from './utils'

const CHAT_URL = 'https://chatbot-api.userlocal.jp/api/chat'

/**
 * @link http://www.userlocal.jp/pdf/userlocal_chatbot.pdf
 */
export default class UserLocalAccess {

  constructor(botName, apiKey, platform) {
    this.botName = botName
    this.platform = platform
    this.apiKey = apiKey
  }

  async getReply(userName, text) {
    const options = {
      method: 'POST',
      url: CHAT_URL,
      body: {
        bot_name: this.botName,
        platform: this.platform,
        key: this.apiKey,
        user_name: userName,
        message: text
      },
      json: true
    }
    const resBody = await utils.asyncRequest(options)
    return resBody.result
  }
}
