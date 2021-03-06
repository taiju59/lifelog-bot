import config from 'config'
import GithubApiAccess from '../libs/GithubApiAccess'

export default class GithubApiAccessWrapper {

  constructor() {
    this._githubApiAccess = new GithubApiAccess(
      config.github.apiAccessToken,
      config.github.repoPath,
      config.app.botId
    )
  }

  async acceptFeedbackForIssue(userId, title) {
    return this._githubApiAccess.addIssue(title, `User${userId}`, ['feedback'])
  }
}
