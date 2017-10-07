import Line from './Line'
import UserState from './UserState'
import UserReminder from './UserReminder'

export default {
  async getByLineUserId(lineUserId) {
    return await Line.getByLineUserId(lineUserId)
  },
  async getLineUserId(userId) {
    return await Line.getLineUserId(userId)
  },
  async createLineUser(lineUserId) {
    return await Line.create(lineUserId)
  },
  async addOrSetState(userId, name, argument = null) {
    return await UserState.addOrSetState(userId, name, argument)
  },
  async getState(userId) {
    return await UserState.getState(userId)
  },
  async removeState(userId) {
    await UserState.removeState(userId)
  },
  async addReminder(userId, name, time = null) {
    return await UserReminder.add(userId, name, time = null)
  }
}
