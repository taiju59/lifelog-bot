import utils from './utils'

const ROOT_URL = 'https://api.github.com/repos/'

export default class GithubApiAccess {

  constructor(accessToken, repoPath, userAgent) {
    this._accessToken = accessToken
    this._repoPath = repoPath
    this._userAgent = userAgent
  }

  async addIssue(title, body = null, labels = null) {
    const options = {
      method: 'POST',
      // url: ROOT_URL + this._repoPath + 'issues',
      url: `${ROOT_URL}${this._repoPath}issues?access_token=${this._accessToken}`,
      headers: {
        // Authorizationt: 'token ' + this._accessToken,
        'User-Agent': this._userAgent
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
