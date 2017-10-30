export default class ShareHelpFeedbackMessages {

  static create() {
    return [{
      type: 'template',
      altText: 'どれにする？',
      template: {
        type: 'buttons',
        text: 'どれにする？',
        actions: [{
          type: 'message',
          label: 'シェア',
          text: 'シェア'
        }, {
          type: 'message',
          label: 'ヘルプ',
          text: 'ヘルプ'
        }, {
          type: 'message',
          label: 'フィードバック',
          text: 'フィードバック'
        }]
      }
    }]
  }
}
