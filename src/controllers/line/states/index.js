import actions from '../actions'

export default async (bot, user, event, state) => {
  switch (state.name) {
    case 'hearReminder':
      await actions.hearReminder(bot, user, event)
      break
    case 'confirmReminder':
      await actions.confirmReminder(bot, user, event, state)
      break
    case 'selectReminder':
      await actions.selectReminder(bot, user, event)
      break
    case 'editReminder':
      await actions.editReminder(bot, user, event, state)
      break
    default:
      console.log(Error('Invalid arguments(state): ' + JSON.stringify(state)))
  }
}
