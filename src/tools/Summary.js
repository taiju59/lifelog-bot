import moment from 'moment-timezone'
import services from '../shared/services'

export default class Summary {

  constructor(userId, timezone) {
    this.userId = userId
    this.timezone = timezone
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
    // TODO: パフォーマンス考慮のため月の履歴から算出
    const remindHistories = await this._getYesterdayRemindHistories(this.userId, this.timezone)
    if (remindHistories.length == 0) return // 対象履歴なし
    const mounthRemindHistories = await this._getMounthRemindHistories(this.userId, this.timezone)
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

  async _getYesterdayRemindHistories(userId, timezone) {
    const mmt = moment(new Date()).tz(timezone).startOf('day')
    const today = mmt.format()
    const yesterday = mmt.subtract(1, 'day').format() // subtractは破壊的のため注意

    return await services.User.getRemindHistories(userId, yesterday, today)
  }

  async _getMounthRemindHistories(userId, timezone) {
    const mmt = moment(new Date()).tz(timezone)
    const firstDay = mmt.clone().startOf('month').format()
    const today = mmt.clone().startOf('day').format()

    return await services.User.getRemindHistories(userId, firstDay, today)
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
