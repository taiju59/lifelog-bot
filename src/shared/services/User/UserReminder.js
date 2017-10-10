import models from '../../models'

export default class UserReminder {

  static async get(reminderId) {
    return await models.UserReminder.findById(reminderId)
  }

  static async add(userId, name, time = null) {
    return await models.UserReminder.create({
      userId: userId,
      name: name,
      time: time
    })
  }

  static async remove(reminderId) {
    await models.UserReminder.destroy({
      where: {
        id: reminderId
      }
    })
  }

  static async getAll(userId) {
    return await models.UserReminder.findAll({
      where: {
        userId: userId
      }
    })
  }

  static async getFromTime(min, max) {
    // min <= time AND time < max
    return await models.UserReminder.findAll({
      where: {
        time: {
          gte: min,
          lt: max
        }
      }
    })
  }

  static async setName(reminderId, name) {
    return await models.UserReminder.update({
      name: name
    }, {
      where: {
        id: reminderId
      }
    })
  }

  static async setTime(reminderId, time) {
    return await models.UserReminder.update({
      time: time
    }, {
      where: {
        id: reminderId
      }
    })
  }
}
