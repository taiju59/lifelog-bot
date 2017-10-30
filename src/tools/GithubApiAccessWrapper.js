import config from 'config'
import GithubApiAccess from '../libs/GithubApiAccess'

export default class GithubApiAccessWrapper {

  constructor() {
    this.githubApiAccess = new GithubApiAccess(
      config.github.apiAccessToken,
      config.github.repoPath,
      config.app.botId
    )
  }

  async acceptFeedbackForIssue(title) {
    return this.githubApiAccess.addIssue(title, ['feedback'])
  }
}
