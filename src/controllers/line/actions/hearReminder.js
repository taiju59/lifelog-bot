import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, event) => {
  if (event.message.type != 'text') {
    await bot.send([Stickers.badMessage(), {
      type: 'text',
      text: '名前はテキストで教えてね'
    }])
    return
  }
  const messageText = event.message.text
  if (messageText.length > 200) {
    await bot.send([Stickers.badMessage(), {
      type: 'text',
      text: 'ごめん、200文字以内でお願い'
    }])
    return
  }
  await services.User.setState(user.id, 'confirmReminder', messageText)
  await bot.send([{
    type: 'template',
    altText: `「${messageText}」でいいかな？`,
    template: {
      type: 'confirm',
      text: `「${messageText}」でいいかな？`,
      actions: [{
        type: 'message',
        label: '登録',
        text: '登録'
      }, {
        type: 'message',
        label: 'キャンセル',
        text: 'キャンセル'
      }]
    }
  }])
}