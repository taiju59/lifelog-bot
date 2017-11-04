import moment from 'moment-timezone'
import services from '../shared/services'

export default class Summary {

  constructor(userId, timezone, endDate) {
    this._userId = userId
    this._timezone = timezone
    this._endDate = endDate
  }

  /**
   * summary
   * {
   *     doneRate: Number (done rate %),
   *     list: [
   *     {
   *         name: String (name of reminder),
   *         done: true or false,
   *         count: Number (done count of this mounth)
   *     },
   *     ...,
   * ]}
   */
  async get() {
    const remindHistories = await this._getYesterdayRemindHistories(this._userId, this._timezone, this._endDate)
    if (remindHistories.length == 0) return // 対象履歴なし
    const mounthRemindHistories = await this._getMounthRemindHistories(this._userId, this._timezone, this._endDate)
    const list = []
    for (const history of remindHistories) {
      const reminder = await services.User.getReminder(history.reminderId)
      const count = this._getMounthDoneCount(history.reminderId, mounthRemindHistories)
      list.push({
        name: reminder.name,
        done: history.answer,
        count: count
      })
    }
    return {
      doneRate: this._getDoneRate(list),
      list: list
    }
  }

  // 昨日の00:00 〜 本日00:00 までのリマインド履歴取得
  async _getYesterdayRemindHistories(userId, timezone, now) {
    const mmt = moment(now).tz(timezone).startOf('day')
    const today = mmt.format()
    const yesterday = mmt.clone().subtract(1, 'day').format() // subtractは破壊的のため注意

    return await services.User.getRemindHistories(userId, yesterday, today)
  }

  // 月初から現時刻までのリマインド履歴取得
  async _getMounthRemindHistories(userId, timezone, now) {
    const mmt = moment(now).tz(timezone)
    const firstDay = mmt.clone().startOf('month').format()
    const nowStr = mmt.format()

    return await services.User.getRemindHistories(userId, firstDay, nowStr)
  }

  _getMounthDoneCount(reminderId, mounthRemindHistories) {
    return mounthRemindHistories.filter((history) => {
      return history.answer == true && history.reminderId == reminderId
    }).length
  }

  _getDoneRate(nameAndDone) {
    const doneNum = nameAndDone.filter((nd) => nd.done).length
    return Math.floor(doneNum / nameAndDone.length * 100) // %で返す
  }
}
