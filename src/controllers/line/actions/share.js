import config from 'config'

export default async (bot) => {
  // TODO: ちゃんとした実装
  await bot.send([{
    type: 'text',
    text: config.line.addFriendUrl
  }])
}
