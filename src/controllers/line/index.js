import eventHandler from './events'

export default async (arg) => {
  // イベントの検証
  const events = arg.events
  if (events == null || events.length == 0) {
    console.log(Error('Invalid arguments(no events): ' + JSON.stringify(arg)))
    return
  }
  await eventHandler(events[0])
}
