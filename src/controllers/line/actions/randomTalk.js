import config from 'config'
import UserLocalAccess from '../../../libs/UserLocalAccess'

export default async (bot, user, event) => {
  if (event.message.type != 'text') {
    // テキストのみ対応
    //TODO: 例外メッセージ
    return
  }
  const profile = await bot.getProfile()
  const userLocalAccess = new UserLocalAccess(
    config.app.botName,
    config.userLocal.apiKey,
    'line'
  )
  const replyText = await userLocalAccess.getReply(
    profile.displayName,
    event.message.text
  )
  await bot.send([{
    type: 'text',
    text: replyText
  }])
}
