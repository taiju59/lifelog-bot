import models from '../../models'

export default class Line {

  static async getByLineUserId(lineUserId) {
    const lineUser = await models.UserLineData.findOne({
      where: {
        lineUserId: lineUserId
      }
    })
    if (lineUser == null) {
      return
    }
    return await models.User.findById(lineUser.userId)
  }

  static async getLineUserId(userId) {
    const lineData = await models.UserLineData.findOne({
      where: {
        userId: userId
      }
    })
    if (lineData == null) return
    return lineData.lineUserId
  }

  static async create(lineUserId) {
    // TODO: トランザクションで対応
    const user = await models.User.create({
      platform: 'line',
      timezone: 'Asia/Tokyo', // TODO: LINEユーザーのタイムゾーンを取得
      isActive: true
    })
    await models.UserLineData.create({
      userId: user.id,
      lineUserId: lineUserId
    })
    return user
  }
}
