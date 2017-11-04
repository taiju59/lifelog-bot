import config from 'config'
import services from '../../../shared/services'
import utils from '../../../libs/utils'
import LineBotWrapper from '../../../tools/LineBotWrapper'
import WelcomeMessages from '../../../views/WelcomeMessages'

const DEFAULT_SETS = [{
  name: '朝ごはん',
  time: '09:00'
}, {
  name: '昼ごはん',
  time: '12:00'
}, {
  name: '晩ごはん',
  time: '19:00'
}]

export default async (lineUserId, replyToken) => {
  const user = await services.User.createLineUser(lineUserId)
  const timezoneDefaultSets = DEFAULT_SETS.map((obj) => {
    return {
      name: obj.name,
      time: utils.timeStrToUtc(obj.time, user.timezone, 'HH:mm')
    }
  })
  await services.User.initReminders(user.id, timezoneDefaultSets)
  const bot = new LineBotWrapper(user.id, config.line.channelAccessToken, replyToken)
  const messages = await WelcomeMessages.create()
  await bot.send(messages)
}
