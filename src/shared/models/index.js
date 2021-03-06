import Sequelize from 'sequelize'
import config from 'config'
import user from './user'
import userLineData from './userLineData'
import userReminder from './userReminder'
import userRemindHistory from './userRemindHistory'
import userState from './userState'

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  config.database.options
)
const User = user(sequelize)
const UserLineData = userLineData(sequelize)
const UserReminder = userReminder(sequelize)
const UserRemindHistory = userRemindHistory(sequelize)
const UserState = userState(sequelize)

User.hasOne(UserLineData, {foreignKey:'userId'})
User.hasMany(UserReminder, {foreignKey:'userId'})
User.hasMany(UserRemindHistory, {foreignKey:'userId'})
UserReminder.hasMany(UserRemindHistory, {foreignKey:'reminderId'})
User.hasMany(UserState, {foreignKey:'userId'})

exports.User = User
exports.UserLineData = UserLineData
exports.UserReminder = UserReminder
exports.UserRemindHistory = UserRemindHistory
exports.UserState = UserState
