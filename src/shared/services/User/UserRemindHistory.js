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

  static async getAll(userId) {
    return await models.UserRemindHistory.findAll({
      where: {
        userId: userId
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
