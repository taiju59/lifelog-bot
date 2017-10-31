import config from 'config'
import services from '../../../shared/services'
import GithubApiAccessWrapper from '../../../tools/GithubApiAccessWrapper'

export default async (bot, user, event, state) => {
  if (event.message.type != 'text') {
    await _except(bot)
    return
  }
  await services.User.removeState(user.id)
  await new GithubApiAccessWrapper().acceptFeedbackForIssue(user.id, event.message.text)
  await bot.send([{
    type: 'text',
    text: `フィードバックを受け付けたよ♪\n${config.github.issuesUrl}`
  }])
}

const _except = async (bot) => {
  await bot.send([{
    type: 'text',
    text: 'フィードバックはテキストで教えてね'
  }])
}
