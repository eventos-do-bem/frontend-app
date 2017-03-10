import CommonService  from './../common/service/common.js'

export default class ProfileService extends CommonService {
  constructor($http, FacebookService, envService, $rootScope, StorageService) {
    super($http, envService)
    this.http = $http
    this.facebookService = FacebookService
    this.rootScope = $rootScope
    this.storage = StorageService
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
  getEvents(params) {
    super.setRoute('users/me/events')
    if (params != undefined) {
      super.setParams(params)
    }
    return super.findAll()
  }
  getEventPayments(uuid, params) {
    super.setRoute(`users/me/events/${uuid}/payments`)
    if (params != undefined) {
      super.setParams(params)
    }
    return super.findAll()
  }
  getPayments(params) {
    super.setRoute(`users/me/payments`)
    if (params != undefined) {
      super.setParams(params)
    }
    return super.findAll()
  }
  change(data, progress) {
    let fd = new FormData()
    angular.forEach(data, (value, key) => {
      fd.append(key, value)
    })
    this.setRoute('users/me')
    return this.http({
      method: 'POST',
      url: this.url + this.route,
      data: fd,
      headers: {'Content-Type': undefined},
      uploadEventHandlers: {
        progress: e => progress(e)
      }
    })
  }
  setProfile(data) {
    this.storage.setItem('token', data.token)
    let profile = {}
    let fields = ['name', 'institutions', 'email', 'type', 'avatar', 'permissions']
    fields.map(name => {
      if (data.type == 'ong' && name == 'institutions') {
        profile.name = data[name].name
      } else {
        profile[name] = data[name]
      }
    })
    this.storage.setItem('profile', profile)
    this.rootScope.$broadcast('profile.change')
    return profile
  }
  getProfile() {
    return this.storage.getItem('profile')
  }
  registerFacebook(callback) {
    return this.facebookService.auth(callback)
  }
  logoutFacebook(callback) {
    return this.facebookService.logout(callback)
  }
}

ProfileService.$inject = ['$http','FacebookService','envService','$rootScope','StorageService']