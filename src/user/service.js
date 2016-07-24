import CommonService  from './../common/service/common.js'

export default class UserService extends CommonService {
  constructor(API, $http, FacebookService) {
    super(API, $http)
    this.facebookService = FacebookService
  }
  register(data) {
    data = this.setDataToken(data)
    this.setRoute('users')
    return this.$http.post(this.url + this.route, data)
  }
  me() {
    this.setRoute('users/me')
    return this.$http.get(this.url + this.route)
  }
  change(data) {
    this.setRoute('users/me')
    return this.$http.post(this.url + this.route, data)
  }
  meFaceBookCallback(token, callback) {
    return this.meFacebook(response => {
      response['facebook_token'] = token
      return callback(response)
    })
  }
  registerFacebook(callback) {
    this.facebookService.getLoginStatus(response => {
      let token = ''
      if (response.status === 'connected') {
        token = response.authResponse.accessToken
        return this.meFaceBookCallback(token, callback)
      } else {
        return this.facebookService.login(response => {
          if (response.status === 'connected') {
            token = response.authResponse.accessToken
            return this.meFaceBookCallback(token, callback)
          }
        }, {
          scope: 'public_profile,email,user_birthday'
        })
      }
    })
  }
  logoutFacebook(callback) {
    return this.facebookService.logout(callback)
  }
  meFacebook(callback) {
    this.facebookService.api('/me', {
      fields: 'name,email,gender,birthday'
    }, response => {
      return callback(response)
    })
  }
}

UserService.$inject = ['API','$http','FacebookService']