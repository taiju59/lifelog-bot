
export default async (bot, user, event) => {
  if (event.message.type != 'text') {
    // テキストのみ対応
    //TODO: 例外メッセージ
    return
  }
  await bot.send([{
    type: 'text',
    text: event.message.text
  }])
}
