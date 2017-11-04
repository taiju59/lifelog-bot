import Stickers from '../views/Stickers'

export default class NotificationMessages {

  static create(reminder, remindHistoryId) {
    return [{
      type: 'template',
      altText: `「${reminder.name}」の時間ですよ〜`,
      template: {
        type: 'buttons',
        text: `「${reminder.name}」の時間ですよ〜`,
        actions: [{
          type: 'postback',
          label: 'もうやった',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=true`,
          text: 'やった'
        }, {
          type: 'postback',
          label: '今日はやらない',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=false`,
          text: '今日はやらない'
        }]
      }
    }, Stickers.notify()]
  }
}
