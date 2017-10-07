import services from '../../../shared/services'

export default async (bot, user, event) => {
  if (event.message.type != 'text') {
    await bot.send([{
      type: 'text',
      text: '名前はテキストで教えてね'
    }])
    return
  }
  const messageText = event.message.text
  await services.User.addOrSetState(user.id, 'confirmReminder', messageText)
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