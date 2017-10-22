import utils from '../../../libs/utils'
import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, data) => {
  if (utils.isEmpty(data.remindHistoryId) || utils.isEmpty(data.answer)) {
    console.log(Error(`data require remindHistoryId and answer(data: ${JSON.stringify(data)})`))
    return
  }
  await services.User.updateRemindHistoryAnswer(data.remindHistoryId, data.answer)
  if (data.answer === 'true') {
    await _yes(bot, user, data)
  } else {
    await _no(bot)
  }
  await services.User.removeState(user.id)
}

const _yes = async (bot, user, data) => {
  const histories = await services.User.getRemindHistories(user.id)
  const targetRemindHistory = await services.User.getRemindHistory(data.remindHistoryId)
  const targetHistories = histories.filter((history) => history.reminderId == targetRemindHistory.reminderId)
  const num = _getContinuousNum(targetHistories)
  const text = _getText(num)
  await bot.send([Stickers.done(), {
    type: 'text',
    text: text
  }])
}

const _getContinuousNum = (histories) => {
  let num = 0
  for (const history of histories) {
    if (!history.answer) {
      num = 0
      continue
    }
    num++
  }
  return num
}

const _getText = (num) => {
  if (num === 1) {
    return utils.random(['やるじゃん', '偉いね', 'よくやった'])
  } else if (2 <= num && num <= 3) {
    return `偉いね。連続${num}回達成だよ`
  } else if (num === 4) {
    return `偉いね。連続${num}回達成だよ。3日坊主脱出やね！`
  } else if (5 <= num && num <= 9) {
    return `やるじゃん！連続${num}回達成だよ！`
  } else if (10 === num) {
    return `すごい！連続${num}回達成だよ！`
  } else {
    return `やるじゃん！！連続${num}回達成だよ！`
  }
}

const _no = async (bot) => {
  await bot.send([Stickers.deleted(), {
    type: 'text',
    text: 'そうかい'
  }])
}
