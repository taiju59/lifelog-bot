import utils from './utils'

const ROOT_URL = 'https://api.github.com/repos/'

export default class GithubApiAccess {

  constructor(accessToken, repoPath, userAgent) {
    this.accessToken = accessToken
    this.repoPath = repoPath
    this.userAgent = userAgent
  }

  async addIssue(title, body = null, labels = null) {
    const options = {
      method: 'POST',
      // url: ROOT_URL + this.repoPath + 'issues',
      url: `${ROOT_URL}${this.repoPath}issues?access_token=${this.accessToken}`,
      headers: {
        // Authorizationt: 'token ' + this.accessToken,
        'User-Agent': this.userAgent
      },
      body: {
        title: title,
        body: body,
        labels: labels
      },
      json: true
    }
    return await utils.asyncRequest(options)
  }
}
