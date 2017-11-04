const FIRST_MESSAGE = `よく来たね。
おかんボットは毎日のタスクを登録、通知して、日々の習慣を作るボットだよ。`

const SECOND_MESSAGE = `とりあえず、毎日三食食べてるか聞くけど、
確認・設定・追加したい場合は画面下の「おかんメニュー」から操作してね。

※時間の変更は「一覧」からできるよ`

export default class WelcomeMessages {

  static async create() {
    return [{
      type: 'text',
      text: FIRST_MESSAGE
    }, {
      type: 'text',
      text: SECOND_MESSAGE
    }]
  }
}
