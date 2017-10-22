import moment from 'moment-timezone'
import Stickers from './Stickers'
import services from '../shared/services'

export default class SummaryMessages {

  static async create(userId) {
    const remindHistories = await _getYesterdayRemindHistories(userId)
    if (remindHistories.length === 0) return [] // TODO: 履歴がないユーザに登録を促す
    const nameAndDone = await _createRemindNameAndDone(remindHistories)
    const doneRate = _getDoneRate(nameAndDone)

    let firstMessage
    let sticker
    if (doneRate === 100) {
      firstMessage = `昨日の達成率は${doneRate}%！！\nあんたならできると信じてたよ！`
      sticker = Stickers.perfect()
    } else if (65 <= doneRate && doneRate < 100) {
      firstMessage = `昨日の達成率は${doneRate}%や！\nがんばったね〜`
      sticker = Stickers.great()
    } else if (0 < doneRate && doneRate < 65) {
      firstMessage = `昨日の達成率は${doneRate}%や！\nだんだん調子あげてこ〜`
      sticker = Stickers.good()
    } else {
      firstMessage = 'おや、昨日は忙しかったのかい？\nでも、あんたならできると信じてるよ！'
      sticker = Stickers.zero()
    }

    const listMessage = nameAndDone.map((nd) => {
      const ox = nd.done ? '◯' : '×'
      return `${nd.name}: ${ox}`
    }).join('\n\n')

    return [{
      type: 'text',
      text: firstMessage
    }, {
      type: 'text',
      text: `↓振り返り↓\n==\n${listMessage}\n==`
    }, sticker]
  }
}

const _getYesterdayRemindHistories = async (userId) => {
  const mmt = moment(new Date()).tz('Asia/Tokyo').startOf('day') // JSTでの本日0時0分 TODO: 他タイムゾーン対応
  const today = mmt.format()
  const yesterday = mmt.subtract(1, 'day').format() // subtractは破壊的のため注意

  const remindHistories = await services.User.getRemindHistories(userId, yesterday, today)
  return remindHistories
}

const _createRemindNameAndDone = async (remindHistories) => {
  const nameAndDone = []
  for (const history of remindHistories) {
    const reminder = await services.User.getReminder(history.reminderId)
    nameAndDone.push({
      name: reminder.name,
      done: history.answer
    })
  }
  return nameAndDone
}

const _getDoneRate = (nameAndDone) => {
  const doneNum = nameAndDone.filter((nd) => nd.done).length
  return Math.floor(doneNum / nameAndDone.length * 100) // %で返す
}
