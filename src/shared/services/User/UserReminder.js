import models from '../../models'
import utils from '../../../libs/utils'

export default class UserReminder {

  /**
   * reminderSets: array of object {name: 'xxx', time: 'xx:xx'}
   */
  static async initialize(userId, reminderSets) {
    await models.UserReminder.destroy({
      where: {
        userId: userId
      }
    })
    for (const obj of reminderSets) {
      await UserReminder.add(userId, obj.name, obj.time)
    }
  }

  static async get(reminderId) {
    return await models.UserReminder.findById(reminderId)
  }

  static async add(userId, name, time = null) {
    return await models.UserReminder.create({
      userId: userId,
      name: name,
      time: time,
      isActive: true
    })
  }

  static async setActive(reminderId, isActive) {
    return await models.UserReminder.update({
      isActive: isActive
    }, {
      where: {
        id: reminderId
      }
    })
  }

  static async getAll(userId) {
    const reminders = await models.UserReminder.findAll({
      where: {
        userId: userId,
        isActive: true
      }
    })
    // 時刻順にソート
    const user = await models.User.findById(userId)
    reminders.sort((current, next) => {
      // TODO: とりあえず動いた実装にしているので中身を理解して整理する
      if (!current.time) return 1
      if (!next.time) return -1
      const currentTimeStr = utils.timeStrFromUtc(current.time, user.timezone, 'HH:mm')
      const nextTimeStr = utils.timeStrFromUtc(next.time, user.timezone, 'HH:mm')
      if (currentTimeStr <= nextTimeStr) return -1
      return 1
    })
    return reminders
  }

  static async getFromTime(min, max) {
    // min <= time AND time < max
    return await models.UserReminder.findAll({
      where: {
        time: {
          gte: min,
          lt: max
        },
        isActive: true
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
