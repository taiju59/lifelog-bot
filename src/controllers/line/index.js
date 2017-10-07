import config from 'config'
import services from '../../shared/services'
import utils from '../../tools/utils'
import LineBotWrapper from '../../tools/LineBotWrapper'
import eventHandler from './events'
import stateHandler from './states'

export default async (arg) => {
  const events = arg.events
  if (utils.isEmpty(events)) {
    console.log(Error('Invalid arguments(no events): ' + JSON.stringify(arg)))
    return
  }
  const event = events[0]

  // ユーザの作成または取得
  const lineUserId = _getLineUserId(event)
  if (utils.isEmpty(lineUserId)) {
    console.log(Error('Invalid lineUserId: ' + lineUserId))
    return
  }
  let user = await services.User.getByLineUserId(lineUserId)
  if (utils.isEmpty(user)) {
    user = await services.User.createLineUser(lineUserId)
  }

  const bot = new LineBotWrapper(user.id, config.line.channelAccessToken, event.replyToken)
  const state = await services.User.getState(user.id)
  if (utils.isEmpty(state)) {
    // イベントの内容に応じてハンドリング
    await eventHandler(bot, user, event)
  } else {
    // stateの内容に応じてハンドリング
    await stateHandler(bot, user, event, state)
  }

  return 'OK'
}

const _getLineUserId = (event) => {
  const source = event.source
  if (utils.isEmpty(source)) {
    console.log(Error('Invalid arguments(no source): ' + JSON.stringify(event)))
    return
  }
  const lineUserId = event.source.userId
  if (utils.isEmpty(lineUserId)) {
    console.log(Error('Invalid arguments(no lineUserId): ' + JSON.stringify(event.source)))
    return
  }
  return lineUserId
}
