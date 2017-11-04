import actions from '../actions'

const IGNORE_LIST = [
  'やった',
  '今日はやらない',
  'あとでやる'
]

export default async (bot, user, event) => {
  switch (event.message.type) {
    case 'text':
      await _matchText(bot, user, event)
      break
    default:
      await actions.help(bot)
  }
}

const _matchText = async (bot, user, event) => {
  if (IGNORE_LIST.some((ignoreTxt) => ignoreTxt == event.message.text)) {
    // タスク通知への回答
    // TODO: テキストマッチではなくstateなどで判定
    return
  }
  await actions.randomTalk(bot, user, event)
}
