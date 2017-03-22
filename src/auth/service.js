import CommonService  from './../common/service/common.js'

export default class AuthService extends CommonService {
  constructor($http, FacebookService, StorageService, envService) {
    super($http, envService)
    this.facebookService = FacebookService
    this.storage = StorageService
  }
  loginUser(data) {
    data = this.setDataToken(data)
    this.setRoute('auth/login')
    return this.$http.post(this.url + this.route, data)
  }
  loginOng(data) {
    data = this.setDataToken(data)
    this.setRoute('institutions/auth/login')
    return this.$http.post(this.url + this.route, data)
  }
  loginFacebook(callback) {
    return this.facebookService.auth(callback)
  }
  loginAnotherUser(uuid) {
    let originalToken = this.storage.getItem('token'),
        originalProfile = this.storage.getItem('profile')
    this.storage.setItem('original_token', originalToken)
    this.storage.setItem('original_profile', originalProfile)
    this.setRoute('auth/login/' + uuid)
    return this.$http.get(this.url + this.route, this.config)
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
  recovery(data) {
    data = this.setDataToken(data)
    this.setRoute('auth/recovery')
    return this.$http.post(this.url + this.route, data)
  }
  reset(data) {
    data = this.setDataToken(data)
    this.setRoute('auth/recovery/reset')
    return this.$http.post(this.url + this.route, data)
  }
}

AuthService.$inject = ['$http','FacebookService','StorageService','envService']