import services from '../../../shared/services'

export default async (bot, user) => {
  await services.User.setState(user.id, 'hearFeedback')
  await bot.send([{
    type: 'text',
    text: 'フィードバックを受け付けるよ！なんて送っとく？'
  }])
}
