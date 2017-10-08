import utils from '../../../tools/utils'
import actions from '../actions'

export default async (bot, user, event) => {
  const data = utils.postbackDataToObject(event.postback.data)
  // datetimepickerのみ event.postback.params が存在
  Object.assign(data, event.postback.params)
  switch (data.action) {
    case 'setRemindTime':
      await actions.setRemindTime(bot, data)
      break
    default:
      await actions.help(bot)
  }
}
