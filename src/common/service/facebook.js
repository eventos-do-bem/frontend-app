export default class FacebookService {
  constructor(FacebookFactory) {
    this.facebookFactory = FacebookFactory
  }
  me(callback) {
    this.facebookFactory.api('/me', {
      fields: 'name,email,gender,birthday'
    }, response => {
      return callback(response)
    })
  }
  meCallback(token, callback) {
    return this.me(response => {
      response['facebook_token'] = token
      return callback(response)
    })
  }
  auth(callback) {
    this.facebookFactory.getLoginStatus(response => {
      let token = ''
      if (response.status === 'connected') {
        token = response.authResponse.accessToken
        return this.meCallback(token, callback)
      } else {
        return this.facebookFactory.login(response => {
          if (response.status === 'connected') {
            token = response.authResponse.accessToken
            return this.meCallback(token, callback)
          }
        }, {
          scope: 'public_profile,email,user_birthday'
        })
      }
    })
  }
  logout(callback) {
    return this.facebookFactory.logout(callback)
  }
}

FacebookService.$inject = ['FacebookFactory']