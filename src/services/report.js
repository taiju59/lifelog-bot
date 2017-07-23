const utils = require('../utils/utils')

const REPORT_DATA_PATH = __dirname + '/../../data/reports.json'

class Report {

  getAll() {
    const json = utils.readFileSync(REPORT_DATA_PATH)
    return JSON.parse(json)
  }

  ask(userIds, type, askDate) {
    const reports = this.getAll()
    const newReports = userIds.map((value) => {
      return {
        userId: value,
        askDate: askDate,
        type: type,
        answer: false
      }
    })
    Array.prototype.push.apply(reports, newReports)
    const json = JSON.stringify(reports)
    utils.writeFileSync(REPORT_DATA_PATH, json)
  }

  answer(userId, askDate, answerDate) {
    const reports = this.getAll()
    const updatedReports = reports.map((value) => {
      if (value.userId == userId && value.askDate == askDate) {
        value['answer'] = true
        value['answerDate'] = answerDate
      }
      return value
    })
    const json = JSON.stringify(updatedReports)
    utils.writeFileSync(REPORT_DATA_PATH, json)
  }
}
module.exports = new Report()
