const utils = require('../utils/utils')

const REPORT_DATA_PATH = __dirname + '/../../data/meals.json'

class Meal {

  getAll() {
    const json = utils.readFileSync(REPORT_DATA_PATH)
    return JSON.parse(json)
  }

  ask(userIds, type, askDate) {
    const meals = this.getAll()
    const newMeals = userIds.map((value) => {
      return {
        userId: value,
        askDate: askDate,
        type: type,
        answer: false
      }
    })
    Array.prototype.push.apply(meals, newMeals)
    const json = JSON.stringify(meals)
    utils.writeFileSync(REPORT_DATA_PATH, json)
  }

  answer(userId, askDate, answerDate) {
    const meals = this.getAll()
    const updatedMeals = meals.map((value) => {
      if (value.userId == userId && value.askDate == askDate) {
        value['answer'] = true
        value['answerDate'] = answerDate
      }
      return value
    })
    const json = JSON.stringify(updatedMeals)
    utils.writeFileSync(REPORT_DATA_PATH, json)
  }
}
module.exports = new Meal()
