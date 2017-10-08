import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user) => {
  await services.User.removeState(user.id)
  await bot.send([Stickers.cancel(), {
    type: 'text',
    text: 'キャンセルしたよ'
  }])
}
