import config from 'config'
import services from '../../shared/services'
import utils from '../../libs/utils'
import LineBotWrapper from '../../tools/LineBotWrapper'
import actions from './actions'
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
  /**
   * イベント振り分け
   * 1. どの状態でもマッチするテキストメッセージ(メニューアクション)
   * 2. stateが空の状態またはメッセージ以外の場合、イベントに応じたアクション
   * 3. stateに応じたアクション
   */
  const isMatchGlobal = await _matchGlobal(bot, user, event)
  if (isMatchGlobal) {
    return 'OK'
  }
  const state = await services.User.getState(user.id)
  if (utils.isEmpty(state) || event.type != 'message') {
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

const _matchGlobal = async (bot, user, event) => {
  if (!event.message) {
    return false
  }
  if (event.message.type != 'text') {
    return false
  }
  switch (event.message.text) {
    case '追加':
      await actions.askReminder(bot, user)
      return true
    case '一覧':
      await actions.showReminder(bot, user)
      return true
    case 'キャンセル':
      await actions.cancel(bot, user)
      return true
    case 'シェア・ヘルプ・フィードバック':
      await actions.shareHelpFeedback(bot)
      return true
    case 'ヘルプ':
      await actions.help(bot)
      return true
    case 'シェア':
      await actions.share(bot)
      return true
    case 'フィードバック':
      await actions.feedback(bot, user)
      return true
    default:
      return false
  }
}
