import message from './message'

export default async (bot, user, event) => {
  switch (event.type) {
    case 'message':
      await message(bot, user, event)
      break
    case 'follow':
    case 'unfollow':
    case 'join':
    case 'leave':
    case 'postback':
    case 'beacon':
      // TODO: 適切なアクション実行
      break
    default:
      console.log(Error('Invalid arguments(event type): ' + event.type))
  }
}
