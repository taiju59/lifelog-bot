import models from '../../models'

export default class User {

  static async setActive(userId, isActive) {
    return await models.User.update({
      isActive: isActive
    }, {
      where: {
        id: userId
      }
    })
  }
}
