export default class AuthLogin {
  constructor($rootScope, $stateParams, $state, $window, AuthService) {
    this.rememberme = true
    this.login = () => {
      AuthService.login(this.user)
        .then(
          response => {
            $window.localStorage.setItem('token', response.data.token)
            delete response.data.token
            $window.localStorage.setItem('user', JSON.stringify(response.data))
            $rootScope.$broadcast('auth.login')
          },
          error => {
            console.error('error', error)
            this.error = error
          }
        )
    }
  }
}

AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService']