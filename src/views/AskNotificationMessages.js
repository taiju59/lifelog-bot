
export default class AskNotificationMessages {

  static create(reminder, remindHistoryId) {
    return [{
      type: 'template',
      altText: `「${reminder.name}」やった？`,
      template: {
        type: 'buttons',
        text: `「${reminder.name}」やった？`,
        actions: [{
          type: 'postback',
          label: 'やった',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=true`,
          text: 'やった'
        }, {
          type: 'postback',
          label: '今日はやらない',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=false`,
          text: '今日はやらない'
        }, {
          type: 'postback',
          label: 'あとでやる',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=later`,
          text: 'あとでやる'
        }]
      }
    }]
  }
}
