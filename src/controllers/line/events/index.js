import services from '../../../shared/services'
import actions from '../actions'
import message from './message'
import postback from './postback'

export default async (bot, user, event) => {
  switch (event.type) {
    case 'message':
      await message(bot, user, event)
      break
    case 'follow':
      await services.User.setActive(user.id, true)
      await actions.help(bot)
      break
    case 'unfollow':
      await services.User.setActive(user.id, false)
      break
    case 'postback':
      await postback(bot, user, event)
      break
    case 'join':
    case 'leave':
    case 'beacon':
      // DO NOTHING
      break
    default:
      console.log(Error('Invalid arguments(event type): ' + event.type))
  }
}
