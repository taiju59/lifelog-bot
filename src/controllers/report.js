const utils = require('../utils/utils')
const line = require('../utils/line')
const userService = require('../services/user')
const reportService = require('../services/report')

const TYPE_BREAKFAST = 'breakfast'
const TYPE_LUNCH = 'lunch'
const TYPE_DINNER = 'dinner'

class Report {
  ask(type) {
    let typeText
    switch (type) {
      case TYPE_BREAKFAST:
        typeText = '朝食'
        break
      case TYPE_LUNCH:
        typeText = '昼食'
        break
      case TYPE_DINNER:
        typeText = '夕食'
        break
      default:
        console.log('Invalid type')
        return
    }
    const userIds = userService.getAllIds()
    const askDate = new Date().getTime()
    reportService.ask(userIds, type, askDate)
    line.multiCast(userIds, [{
      'type': 'template',
      'altText': typeText + '確認',
      'template': {
        'type': 'buttons',
        'text': typeText + 'は食べましたか？',
        'actions': [{
          'type': 'postback',
          'label': 'はい',
          'data': 'ask=' + askDate
        }]
      }
    }])
  }

  answer(userId, data) {
    //TODO: データの形式を検討した上での処理
    const askDate = data.split('=')[1]
    const answerDate = new Date().getTime()
    reportService.answer(userId, askDate, answerDate)
  }

  send() {
    const userIds = userService.getAllIds()
    const reports = reportService.getAll()
    for (const userId of userIds) {
      const userReports = reports.filter((value, index) => {
        return (value.userId == userId)
      })
      if (!userReports || userReports.length == 0) {
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
            reportMessage += '朝食'
            break
          case TYPE_LUNCH:
            reportMessage += '昼食'
            break
          case TYPE_DINNER:
            reportMessage += '夕食'
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
        text: reportMessage
      }])
    }
  }
}
module.exports = new Report()