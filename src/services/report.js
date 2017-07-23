const utils = require('../utils/utils')

const REPORT_DATA_PATH = __dirname + '/../../data/reports.json'

class Report {
  getAll() {
    const json = utils.readFileSync(REPORT_DATA_PATH)
    return JSON.parse(json)
  }
}
module.exports = new Report()
