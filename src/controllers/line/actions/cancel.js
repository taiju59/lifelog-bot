import services from '../../../shared/services'

export default async (bot, user) => {
  await services.User.removeState(user.id)
  await bot.send([{
    type: 'text',
    text: 'キャンセルしたよ'
  }])
}
