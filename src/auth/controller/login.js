export default class AuthLogin {
  constructor($rootScope, $stateParams, $state, $window, $q, AuthService, StorageService, FbService) {
    this.service = AuthService
    this.fbService = FbService
    this.storage = StorageService
    this.$window = $window
    this.$rootScope = $rootScope
    this.rememberme = true
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.validate = {
      email: "{'has-error':login.email.$error.email || login.email.$error.required}",
      password: "{'has-error':login.password.$error.required || login.password.$error.minlength}"
    }
  }
  toggleShowPassword() {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  loginFb() {
    this.fbService.login(
      response => {
        console.log(response)
      },
      error => {
        console.error(error)
      }
    )
  }
  login() {
    this.service.login(this.user)
      .then(
        response => this.loginSuccess(response),
        response => this.loginError(response)
      )
  }
  loginSuccess(response) {
    let storage = this.storage.getStorage(this.user.rememberme)
    this.$window[storage].setItem('token', response.data.token)
    let { email, name } = response.data
    this.$window[storage].setItem('user', JSON.stringify({name: name, email: email}))
    this.$rootScope.$broadcast('auth.login')
  }
  loginError(response) {
    this.error = response.data
  }
}

AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$window', '$q', 'AuthService', 'StorageService', 'FbService']