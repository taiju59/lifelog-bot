import User from './User'
import Line from './Line'
import UserState from './UserState'
import UserReminder from './UserReminder'
import UserRemindHistory from './UserRemindHistory'

export default {
  async getAllUsers() {
    return await User.getAll()
  },
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
  async initReminders(userId, reminderSets) {
    return await UserReminder.initialize(userId, reminderSets)
  },
  async getReminder(reminderId) {
    return await UserReminder.get(reminderId)
  },
  async addReminder(userId, name, time = null) {
    return await UserReminder.add(userId, name, time = null)
  },
  async setReminderActive(reminderId, isActive) {
    return await UserReminder.setActive(reminderId, isActive)
  },
  async getAllReminders(userId) {
    return await UserReminder.getAll(userId)
  },
  async getReminderFromTime(min, max) {
    return await UserReminder.getFromTime(min, max)
  },
  async setReminderName(reminderId, name) {
    return await UserReminder.setName(reminderId, name)
  },
  async setRemindTime(reminderId, time) {
    return await UserReminder.setTime(reminderId, time)
  },
  async getRemindHistory(remindHistoryId) {
    return await UserRemindHistory.get(remindHistoryId)
  },
  async addRemindHistory(userId, reminderId, nextRemindAt = null) {
    return await UserRemindHistory.add(userId, reminderId, nextRemindAt)
  },
  async updateRemindHistoryAnswer(remindHistoryId, answer) {
    return await UserRemindHistory.updateAnswer(remindHistoryId, answer)
  },
  async getRemindHistories(userId, timeMin = null, timeMax = null) {
    return await UserRemindHistory.getAll(userId, timeMin, timeMax)
  },
  async getNextRemind(timeMin, timeMax) {
    return await UserRemindHistory.getNextRemind(timeMin, timeMax)
  },
  async setNextRemind(remindHistoryId, nextRemindAt) {
    return await UserRemindHistory.setNextRemind(remindHistoryId, nextRemindAt)
  },
  async removeNextRemind(remindHistoryId) {
    return await UserRemindHistory.removeNextRemind(remindHistoryId)
  }
}
