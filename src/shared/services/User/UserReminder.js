import models from '../../models'

export default class UserReminder {

  static async add(userId, name, time = null) {
    return await models.UserReminder.create({
      userId: userId,
      name: name,
      time: time
    })
  }

  static async getAll(userId) {
    return await models.UserReminder.findAll({
      where: {
        userId: userId
      }
    })
  }
}
