export default class AuthLogin {
  constructor($rootScope, $stateParams, $state, $q, $window, AuthService, StorageService) {
    this.service = AuthService
    this.storage = StorageService
    this.$rootScope = $rootScope
    this.$window = $window
    this.user = {
      rememberme: true
    }
    this.showPassword = false
    this.typeInputPassword = 'password'
  }
  toggleShowPassword() {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  loginFacebook() {
    this.service.loginFacebook(response => {
      this.login(response)
    })
  }
  login(user) {
    user = (user) ? angular.copy(user) : angular.copy(this.user)
    this.$window.localStorage.setItem('rememberme', user.rememberme)
    this.service.login(user)
      .then(
        response => this.loginSuccess(response),
        response => this.loginError(response)
      )
  }
  loginSuccess(response) {
    this.$window.localStorage.setItem('token', response.data.token)
    let { email, name } = response.data
    this.$window.localStorage.setItem('user', JSON.stringify({name: name, email: email}))
    this.$rootScope.$broadcast('auth.login')
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