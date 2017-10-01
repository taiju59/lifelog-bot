import models from '../../models'

export default class Line {

  static async getByLineUserId(lineUserId) {
    const lineUser = await models.LineData.findOne({
      where: {
        lineUserId: lineUserId
      }
    })
    if (lineUser == null) {
      return
    }
    return await models.User.findById(lineUser.userId)
  }

  static async create(lineUserId) {
    // TODO: トランザクションで対応
    const user = await models.User.create({
      platform: 'line',
      isActive: true
    })
    await models.LineData.create({
      userId: user.id,
      lineUserId: lineUserId
    })
    return user
  }
}
