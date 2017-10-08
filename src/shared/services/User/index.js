import User from './User'
import Line from './Line'
import UserState from './UserState'
import UserReminder from './UserReminder'

export default {
  async setActive(userId, isActive) {
    return await User.setActive(userId, isActive)
  },
  async getByLineUserId(lineUserId) {
    return await Line.getByLineUserId(lineUserId)
  },
  async getLineUserId(userId) {
    return await Line.getLineUserId(userId)
  },
  async createLineUser(lineUserId) {
    return await Line.create(lineUserId)
  },
  async setState(userId, name, argument = null) {
    return await UserState.setState(userId, name, argument)
  },
  async getState(userId) {
    return await UserState.getState(userId)
  },
  async removeState(userId) {
    await UserState.removeState(userId)
  },
  async getReminder(reminderId) {
    return await UserReminder.get(reminderId)
  },
  async addReminder(userId, name, time = null) {
    return await UserReminder.add(userId, name, time = null)
  },
  async removeReminder(reminderId) {
    return await UserReminder.remove(reminderId)
  },
  async getAllReminder(userId) {
    return await UserReminder.getAll(userId)
  },
  async getReminderFromTime(min, max) {
    return await UserReminder.getFromTime(min, max)
  },
  async setRemindTime(reminderId, time) {
    return await UserReminder.setTime(reminderId, time)
  }
}
