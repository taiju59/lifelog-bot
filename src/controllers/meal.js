const utils = require('../utils/utils')
const line = require('../utils/line')
const userService = require('../services/user')
const mealService = require('../services/meal')

const TYPE_BREAKFAST = 'breakfast'
const TYPE_LUNCH = 'lunch'
const TYPE_DINNER = 'dinner'

class Meal {
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
    mealService.ask(userIds, type, askDate)
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
    mealService.answer(userId, askDate, answerDate)
  }

  send() {
    const userIds = userService.getAllIds()
    const meals = mealService.getAll()
    for (const userId of userIds) {
      const userMeals = meals.filter((value, index) => {
        return (value.userId == userId)
      })
      if (!userMeals || userMeals.length == 0) {
        // レポートする内容が存在しない場合
        console.log('No meals(userId: ' + userId + ')')
        return
      }
      // レポートメッセージ生成
      let mealMessage = 'これまでのレポートをお送りします！\n\n=='
      for (const meal of userMeals) {
        const askDate = utils.timeToString(meal.askDate, 'MM月DD日(ddd)')
        mealMessage += '\n' + askDate + ' '
        switch (meal.type) {
          case TYPE_BREAKFAST:
            mealMessage += '朝食'
            break
          case TYPE_LUNCH:
            mealMessage += '昼食'
            break
          case TYPE_DINNER:
            mealMessage += '夕食'
            break
        }
        mealMessage += '\n回答: '
        if (meal.answer) {
          mealMessage += utils.timeToString(meal.answerDate, 'HH時mm分')
        } else {
          mealMessage += '無し'
        }
        mealMessage += '\n'
      }
      mealMessage += '==\n\nこれからも頑張りましょう♪'
      // レポート送信
      line.push(userId, [{
        type: 'text',
        text: mealMessage
      }])
    }
  }
}
module.exports = new Meal()