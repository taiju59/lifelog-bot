import services from '../../../shared/services'

export default async (bot, user) => {
  await services.User.addOrSetState(user.id, 'hearReminder')
  await bot.send([{
    type: 'text',
    text: '新しいリマインダーを登録するよ'
  }, {
    type: 'text',
    text: 'なんて名前で登録する？'
  }])
}
