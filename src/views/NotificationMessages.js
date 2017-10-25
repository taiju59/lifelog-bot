import Stickers from '../views/Stickers'

export default class NotificationMessages {

  static create(reminder) {
    return [{
      type: 'text',
      text: `「${reminder.name}」の時間ですよ〜`
    }, Stickers.notify()]
  }
}
