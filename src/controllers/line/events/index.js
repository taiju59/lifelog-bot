import config from 'config'
import utils from '../../../tools/utils'
import LineBotWrapper from '../../../tools/LineBotWrapper'
import services from '../../../shared/services'
import message from './message'

export default async (event) => {
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

  // イベントの内容に応じてハンドリング
  await _handleEvent(user, event)
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

const _handleEvent = async (user, event) => {
  const bot = new LineBotWrapper(user.id, config.line.channelAccessToken, event.replyToken)
  // TODO: 状態に応じて各コントローラ呼び出し
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
