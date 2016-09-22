import CommonService  from './../common/service/common.js'

export default class ProfileService extends CommonService {
  constructor(API, $http, FacebookService) {
    super(API, $http)
    this.facebookService = FacebookService
  }
  register(data) {
    data = this.setDataToken(data)
    this.setRoute('users')
    return this.$http.post(this.url + this.route, data)
  }
  confirmation(data) {
    this.setRoute('users/confirmation/' + data.uuid + '/' + data.confirmation_code)
    return this.$http.put(this.url + this.route)
  }
  me() {
    this.setRoute('users/me')
    return this.$http.get(this.url + this.route)
  }
  getEvents() {
    this.setRoute('users/me/events')
    return this.$http.get(this.url + this.route)
  }
  change(data) {
    this.setRoute('users/me')
    return this.$http.put(this.url + this.route, data)
  }
  registerFacebook(callback) {
    return this.facebookService.auth(callback)
  }
  logoutFacebook(callback) {
    return this.facebookService.logout(callback)
  }
}

ProfileService.$inject = ['API','$http','FacebookService']