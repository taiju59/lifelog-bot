import Sequelize from 'sequelize'
import config from 'config'
import user from './user'
import lineData from './lineData'
import reminder from './reminder'

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  config.database.options
)
const User = user(sequelize)
const LineData = lineData(sequelize)
const Reminder = reminder(sequelize)

User.hasOne(LineData, {foreignKey:'userId'})
User.hasMany(Reminder, {foreignKey:'userId'})

exports.User = User
exports.LineData = LineData
exports.Reminder = Reminder
