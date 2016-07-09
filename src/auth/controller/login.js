export default class AuthLogin {
  constructor($rootScope, $stateParams, $state, $window, AuthService) {
    this.service = AuthService
    this.$window = $window
    this.$rootScope = $rootScope
    this.rememberme = true
  }
  login() {
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

AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService']