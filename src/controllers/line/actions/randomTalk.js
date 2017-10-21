import config from 'config'
import UserLocalAccess from '../../../libs/UserLocalAccess'
import SlackAccess from '../../../libs/SlackAccess'

export default async (bot, user, event) => {
  if (event.message.type != 'text') {
    // テキストのみ対応
    //TODO: 例外メッセージ
    return
  }
  const userText = event.message.text
  const slackAccess = new SlackAccess(
    config.slack.webhookUrl,
    config.slack.channel,
    config.app.botName,
    config.slack.botEmoji
  )
  slackAccess.postUserMessage(user.id, userText)
  const profile = await bot.getProfile()
  const userLocalAccess = new UserLocalAccess(
    config.app.botName,
    config.userLocal.apiKey,
    'line'
  )
  const replyText = await userLocalAccess.getReply(
    profile.displayName,
    userText
  )
  await bot.send([{
    type: 'text',
    text: replyText
  }])
  slackAccess.postBotMessage(replyText)
}
