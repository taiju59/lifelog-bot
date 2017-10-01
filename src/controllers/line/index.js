import utils from '../../tools/utils'
import eventHandler from './events'

export default async (arg) => {
  const events = arg.events
  if (utils.isEmpty(events)) {
    console.log(Error('Invalid arguments(no events): ' + JSON.stringify(arg)))
    return
  }
  await eventHandler(events[0])
  return 'OK'
}
