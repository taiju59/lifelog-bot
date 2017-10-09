import Stickers from '../../../views/Stickers'

export default async (bot) => {
  await bot.send([Stickers.help(), {
    type: 'text',
    text: _description
  }])
}

const _description = `[使い方]
おかんボットは毎日のタスクを登録、通知して、日々の習慣を作るボットだよ。

画面下の「おかんメニュー」から操作してね。
「追加」「一覧」って言われても反応するよ。
処理を中断したい場合は「キャンセル」って言ってね。`