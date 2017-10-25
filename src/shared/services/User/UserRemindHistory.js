import models from '../../models'

export default class UserRemindHistory {

  static async get(remindHistoryId) {
    return await models.UserRemindHistory.findById(remindHistoryId)
  }

  static async add(userId, reminderId) {
    return await models.UserRemindHistory.create({
      userId: userId,
      reminderId: reminderId
    })
  }

  static async getAll(userId, timeMin = null, timeMax = null) {
    const constrains = {
      userId: userId,
      isConfirmed: true
    }
    if (timeMin !== null || timeMax !== null) {
      constrains.createdAt = {}
      // timeMin <= createdAt AND createdAt < timeMax
      if (timeMin !== null) constrains.createdAt.gte = timeMin
      if (timeMax !== null) constrains.createdAt.lt = timeMax
    }
    return await models.UserRemindHistory.findAll({
      where: constrains
    })
  }

  static async getShouldConfirm(timeMin = null, timeMax = null) {
    const constrains = {
      isConfirmed: false
    }
    if (timeMin !== null || timeMax !== null) {
      constrains.createdAt = {}
      // timeMin <= createdAt AND createdAt < timeMax
      if (timeMin !== null) constrains.createdAt.gte = timeMin
      if (timeMax !== null) constrains.createdAt.lt = timeMax
    }
    return await models.UserRemindHistory.findAll({
      where: constrains
    })
  }

  static async setConfirmed(remindHistoryId, isConfirmed) {
    return await models.UserRemindHistory.update({
      isConfirmed: isConfirmed
    }, {
      where: {
        id: remindHistoryId
      }
    })
  }

  static async updateAnswer(remindHistoryId, answer) {
    return await models.UserRemindHistory.update({
      answer: answer
    }, {
      where: {
        id: remindHistoryId
      }
    })
  }
}
