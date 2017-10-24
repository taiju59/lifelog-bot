
export default class AskNotificationMessages {

  static create(reminder, remindHistoryId) {
    return [{
      type: 'template',
      altText: `「${reminder.name}」やった？`,
      template: {
        type: 'confirm',
        text: `「${reminder.name}」やった？`,
        actions: [{
          type: 'postback',
          label: 'やった',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=true`,
          text: 'やった'
        }, {
          type: 'postback',
          label: 'やってない',
          data: `action=answerReminder&remindHistoryId=${remindHistoryId}&answer=false`,
          text: 'やってない'
        }]
      }
    }]
  }
}
