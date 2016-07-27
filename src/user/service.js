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
  registerFacebook(callback) {
    return this.facebookService.auth(callback)
  }
  logoutFacebook(callback) {
    return this.facebookService.logout(callback)
  }
}

UserService.$inject = ['API','$http','FacebookService']