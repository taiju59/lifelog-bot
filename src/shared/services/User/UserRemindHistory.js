import models from '../../models'

export default class UserRemindHistory {

  static async get(remindHistoryId) {
    return await models.UserRemindHistory.findById(remindHistoryId)
  }

  static async add(userId, reminderId, nextRemindAt = null) {
    return await models.UserRemindHistory.create({
      userId: userId,
      reminderId: reminderId,
      nextRemindAt: nextRemindAt
    })
  }

  static async getAll(userId, timeMin = null, timeMax = null) {
    const constrains = {
      userId: userId
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

  static async getNextRemind(timeMin, timeMax) {
    // timeMin <= nextRemindAt AND nextRemindAt < timeMax
    return await models.UserRemindHistory.findAll({
      where: {
        nextRemindAt: {
          gte: timeMin,
          lt: timeMax
        }
      }
    })
  }

  static async setNextRemind(remindHistoryId, nextRemindAt) {
    return await models.UserRemindHistory.update({
      nextRemindAt: nextRemindAt
    }, {
      where: {
        id: remindHistoryId
      }
    })
  }

  static async removeNextRemind(remindHistoryId) {
    return await models.UserRemindHistory.update({
      nextRemindAt: null
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
