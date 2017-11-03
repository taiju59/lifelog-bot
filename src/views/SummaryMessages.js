import Stickers from './Stickers'

export default class SummaryMessages {

  static async create(summary) {
    const doneRate = summary.doneRate
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

    const listMessage = summary.list.map((nd) => {
      const ox = nd.done ? '◯' : '×'
      let text = `${nd.name}: ${ox}`
      if (nd.count > 0) text += `\n今月${nd.count}回達成`
      return text
    }).join('\n\n')

    return [{
      type: 'text',
      text: firstMessage
    }, {
      type: 'text',
      text: `↓昨日までの振り返り↓\n\n==\n${listMessage}\n==`
    }, sticker]
  }
}
