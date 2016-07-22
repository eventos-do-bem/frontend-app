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
      console.log(response)
    })
  }
  login() {
    console.log(this.user)
    this.$window.localStorage.setItem('rememberme', this.user.rememberme)
    this.service.login(this.user)
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
    this.error = response.data
  }
}

AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$q', '$window', 'AuthService', 'StorageService']