import actions from '../actions'

export default async (bot, user, event, state) => {
  switch (state.name) {
    case 'hearReminder':
      await actions.hearReminder(bot, user, event)
      break
    case 'confirmReminder':
      await actions.confirmReminder(bot, user, event, state)
      break
    case 'editReminder':
      await actions.editReminder(bot, user, event, state)
      break
    case 'editReminderName':
      await actions.editReminderName(bot, user, event, state)
      break
    case 'hearFeedback':
      await actions.hearFeedback(bot, user, event, state)
      break
    default:
      console.log(Error('Invalid arguments(state): ' + JSON.stringify(state)))
  }
}
