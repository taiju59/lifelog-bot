import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user) => {
  await services.User.setState(user.id, 'hearReminder')
  await bot.send([Stickers.askReminder(), {
    type: 'text',
    text: '新しいタスクを登録するよ'
  }, {
    type: 'text',
    text: 'なんて名前で登録する？'
  }])
}
