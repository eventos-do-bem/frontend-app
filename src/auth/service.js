import CommonService  from './../common/service/common.js'

export default class AuthService extends CommonService {
  constructor(API, $http, FacebookService) {
    super(API, $http)
    this.facebookService = FacebookService
  }
  login(data) {
    data = this.setDataToken(data)
    this.setRoute('auth/login')
    return this.$http.post(this.url + this.route, data)
  }
  loginFacebook(callback) {
    return this.facebookService.auth(callback)
  }
  disconnectFacebook(callback) {
    return this.facebookService.disconnect(response => callback(response))
  }
  logout() {
    this.setRoute('auth/logout')
    return this.$http.get(this.url + this.route);
  }
  confirmation(data) {
    this.setRoute('auth/confirmation')
    return this.$http.get(this.url + this.route);
  }
}

AuthService.$inject = ['API','$http','FacebookService']