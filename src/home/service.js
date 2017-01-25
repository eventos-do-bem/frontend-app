import CommonService  from './../common/service/common.js'

export default class UserService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
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
}

UserService.$inject = ['$http','envService']