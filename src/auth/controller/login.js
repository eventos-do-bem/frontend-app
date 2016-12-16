export default class AuthLogin {
  constructor($rootScope, $stateParams, $state, $q, $window, AuthService, StorageService) {
    this.service = AuthService
    this.storage = StorageService
    this.$rootScope = $rootScope
    this.state = $state
    this.$window = $window
    this.profile = {
      rememberme: true
    }
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.method = 'loginUser'
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
    this.method = method
  }
  login(profile) {
    profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    this.service[this.method](profile)
      .then(
        response => this.loginSuccess(response),
        response => this.loginError(response)
      )
  }
  loginSuccess(response) {
    console.log(response.data)
    this.storage.setItem('token', response.data.token)
    let {name, email, type, avatar, permissions} = response.data
    this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar, permissions: permissions})
    this.$rootScope.$broadcast('profile.change')
    switch(type) {
      case 'user': this.state.go('profile.user.events'); break;
      case 'ong': this.state.go('profile.ong.events'); break;
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

AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$q', '$window', 'AuthService', 'StorageService']