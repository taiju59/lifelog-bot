import utils from '../../../libs/utils'
import actions from '../actions'

export default async (bot, user, event) => {
  const data = utils.postbackDataToObject(event.postback.data)
  // datetimepickerのみ event.postback.params が存在
  Object.assign(data, event.postback.params)
  switch (data.action) {
    case 'setRemindTime':
      await actions.setRemindTime(bot, user, data)
      break
    case 'answerReminder':
      await actions.answerReminder(bot, user, data)
      break
    default:
      await actions.help(bot)
  }
}
