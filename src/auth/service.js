import CommonService  from './../common/service/common.js'

export default class AuthService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
  }
  login(data) {
    data = this.setDataToken(data)
    this.setRoute('auth/login')
    return this.$http.post(this.url + this.route, data)
  }
}

AuthService.$inject = ['API','$http']