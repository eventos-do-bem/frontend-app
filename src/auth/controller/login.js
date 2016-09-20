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
    this.storage.setItem('token', response.data.token)
    let {name, email, type} = response.data
    this.storage.setItem('profile', {name: name, email: email, type: type})
    this.$rootScope.$broadcast('profile.change')
    switch(type) {
      case 'user': this.state.go('profile.user'); break;
      case 'ong': this.state.go('profile.ong'); break;
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