import models from '../src/shared/models'

const createTables = async () => {
  console.log('createTables...')
  await models.User.sync({
    force: true
  })
  console.log('User table created.')
  await models.UserLineData.sync({
    force: true
  })
  console.log('UserLineData table created.')
  await models.UserReminder.sync({
    force: true
  })
  console.log('UserReminder table created.')
  await models.UserState.sync({
    force: true
  })
  console.log('UserState table created.')
}

createTables().then(() => {
  console.log('Finish.')
})

// promiceでのエラー内容を見られるようにする
process.on('unhandledRejection', console.dir)
