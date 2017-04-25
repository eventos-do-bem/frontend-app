export default class AuthLogin {
  constructor($state, AuthService, ProfileService, LastStateUnloggedService) {
    this.state = $state
    this.service = AuthService
    this.profileService = ProfileService
    this.lastStateUnloggedService = LastStateUnloggedService
    this.masterProfile = {}
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.profile = angular.copy(this.masterProfile)
  }
  toggleShowPassword() {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  loginFacebook() {
    this.service.loginFacebook(response => {
      this.login(response)
    })
  }
  login(profile) {
    profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    this.service.loginUser(profile)
      .then(
        response => this.loginSuccess(response),
        response => this.loginError(response)
      )
  }
  loginSuccess(response) {
    let profile = this.profileService.setProfile(response.data)
    if (this.lastStateUnloggedService.getName()) {
      let name = this.lastStateUnloggedService.getName(),
          params = this.lastStateUnloggedService.getParams()
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
    this.profile = angular.copy(this.masterProfile)
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

AuthLogin.$inject = ['$state', 'AuthService', 'ProfileService', 'LastStateUnloggedService']