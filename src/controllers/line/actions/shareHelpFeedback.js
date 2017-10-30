import ShareHelpFeedbackMessages from '../../../views/ShareHelpFeedbackMessages'

export default async (bot) => {
  await bot.send(ShareHelpFeedbackMessages.create())
}
