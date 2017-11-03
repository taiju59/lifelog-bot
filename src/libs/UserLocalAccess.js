import utils from './utils'

const CHAT_URL = 'https://chatbot-api.userlocal.jp/api/chat'

/**
 * @link http://www.userlocal.jp/pdf/userlocal_chatbot.pdf
 */
export default class UserLocalAccess {

  constructor(botName, apiKey, platform) {
    this._botName = botName
    this._platform = platform
    this._apiKey = apiKey
  }

  async getReply(userName, text) {
    const options = {
      method: 'POST',
      url: CHAT_URL,
      body: {
        bot_name: this._botName,
        platform: this._platform,
        key: this._apiKey,
        user_name: userName,
        message: text
      },
      json: true
    }
    const resBody = await utils.asyncRequest(options)
    return resBody.result
  }
}
