import Line from './Line'

export default {
  async getByLineUserId(lineUserId) {
    return await Line.getByLineUserId(lineUserId)
  },
  async createLineUser(lineUserId) {
    return await Line.create(lineUserId)
  }
}