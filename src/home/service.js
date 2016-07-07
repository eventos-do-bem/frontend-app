import CommonService  from './../common/service/common.js'

export default class UserService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
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

UserService.$inject = ['API','$http']