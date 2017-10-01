import config from 'config'
import LineBot from '../../../libs/bots/LineBot'
import message from './message'

export default async (event) => {
  // TODO: ユーザの検証
  // TODO: ユーザの作成 or 取得
  const user = {}
  await handleEvemnt(user, event)
}

const handleEvemnt = async (user, event) => {
  const bot = new LineBot(config.line.channelAccessToken, event.replyToken)
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
