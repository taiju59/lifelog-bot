import models from '../../models'

export default class UserState {

  static async setState(userId, name, argument = null) {
    const state = await UserState.getState(userId)
    if (state == null) {
      return await models.UserState.create({
        userId: userId,
        name: name,
        argument: argument
      })
    }
    return await models.UserState.update({
      name: name,
      argument: argument
    }, {
      where: {
        userId: userId
      }
    })
  }

  static async getState(userId) {
    return await models.UserState.findOne({
      where: {
        userId: userId
      }
    })
  }

  static async removeState(userId) {
    await models.UserState.destroy({
      where: {
        userId: userId
      }
    })
  }
}
