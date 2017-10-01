import models from '../src/shared/models'

const createTables = async () => {
  await models.User.sync({
    force: true
  })
  console.log('User table created.')
  await models.LineData.sync({
    force: true
  })
  console.log('LineData table created.')
  await models.Reminder.sync({
    force: true
  })
  console.log('Reminder table created.')
}

createTables().then(() => {
  console.log('Finish.')
})
