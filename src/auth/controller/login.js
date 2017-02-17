export default class AuthLogin {
  constructor($rootScope, $state, AuthService, StorageService, ProfileService, LastStateUnloggedService) {
    this.service = AuthService
    this.storage = StorageService
    this.profileService = ProfileService
    this.lastStateUnloggedService = LastStateUnloggedService
    this.$rootScope = $rootScope
    this.state = $state
    this.masterProfile = {}
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.method = 'loginUser'
    // this.profile = angular.copy(this.masterProfile)
  }
  toggleShowPassword() {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  loginFacebook() {
    this.service.loginFacebook(response => {
      this.login(response)
    })
  }
  changeMethod(method) {
    this.profile = angular.copy(this.masterProfile)
    this.method = method
  }
  login(profile) {
    profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    this.service[this.method](profile)
      .then(
        response => this.loginSuccess(response),
        response => {
          this.loginError(response)
        }
      )
  }
  loginSuccess(response) {
    // this.storage.setItem('token', response.data.token)
    let profile = this.profileService.setProfile(response.data)
    // this.storage.setItem('profile', profile)
    // this.$rootScope.$broadcast('profile.change')
    if (this.lastStateUnloggedService.getName()) {
      let name = this.lastStateUnloggedService.getName()
      let params = this.lastStateUnloggedService.getParams()
      this.lastStateUnloggedService.clear()
      this.state.go(name, params)
    } else {
      switch(profile.type) {
        case 'user': this.state.go('profile.user.events'); break;
        case 'ong': this.state.go('profile.ong.events'); break;
      }
    }
  }
  loginError(response) {
    this.error = {}
    if (response.data.errors) {
      this.error = response.data
    } else {
      this.error = {
        errors: {
          invalid: [response.data.message]
        }
      }
    }
  }
}

AuthLogin.$inject = ['$rootScope', '$state', 'AuthService', 'StorageService', 'ProfileService', 'LastStateUnloggedService']