const utils = require('../utils/utils')
const line = require('../utils/line')
const userService = require('../services/user')
const reportService = require('../services/report')

const TYPE_BREAKFAST = 'breakfast'
const TYPE_LUNCH = 'lunch'
const TYPE_DINNER = 'dinner'

class Report {
  send() {
    const userIds = userService.getAllIds()
    const reports = reportService.getAll()
    for (const userId of userIds) {
      const userReports = reports.filter((value, index) => {
        return (value.userId == userId)
      })
      if (!userReports) {
        // レポートする内容が存在しない場合
        console.log('No reports(userId: ' + userId + ')')
        return
      }
      // レポートメッセージ生成
      let reportMessage = 'これまでのレポートをお送りします！\n\n=='
      for (const report of userReports) {
        const askDate = utils.timeToString(report.askDate, 'MM月DD日(ddd)')
        reportMessage += '\n' + askDate + ' '
        switch (report.type) {
          case TYPE_BREAKFAST:
            reportMessage += '朝ごはん'
            break
          case TYPE_LUNCH:
            reportMessage += '昼ごはん'
            break
          case TYPE_DINNER:
            reportMessage += '夕ごはん'
            break
        }
        reportMessage += '\n回答: '
        if (report.answer) {
          reportMessage += utils.timeToString(report.answerDate, 'HH時mm分')
        } else {
          reportMessage += '無し'
        }
        reportMessage += '\n'
      }
      reportMessage += '==\n\nこれからも頑張りましょう♪'
      // レポート送信
      line.push(userId, [{
        type: 'text',
        message: reportMessage
      }])
    }
  }
}
module.exports = new Report()

