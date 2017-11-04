import config from 'config'
import services from '../../../shared/services'
import LineBotWrapper from '../../../tools/LineBotWrapper'
import WelcomeMessages from '../../../views/WelcomeMessages'

const DEFAULT_SETS = [{
  name: '朝ごはん',
  time: '00:00' // JST 09:00
}, {
  name: '昼ごはん',
  time: '03:00' // JST 12:00
}, {
  name: '晩ごはん',
  time: '10:00' // JST 19:00
}]

export default async (lineUserId, replyToken) => {
  const user = await services.User.createLineUser(lineUserId)
  await services.User.initReminders(user.id, DEFAULT_SETS)
  const bot = new LineBotWrapper(user.id, config.line.channelAccessToken, replyToken)
  const messages = await WelcomeMessages.create()
  await bot.send(messages)
}
