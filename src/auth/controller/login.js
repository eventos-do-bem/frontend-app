export default class AuthLogin {
  constructor($scope, $stateParams, $state, $window, AuthService) {
    this.rememberme = true
    this.login = () => {
      AuthService.login(this.user)
        .then(
          response => {
            $window.localStorage.setItem('token', response.data.token)
            delete response.data.token
            $window.localStorage.setItem('user', JSON.stringify(response.data))
          },
          error => {
            console.error('error', error)
            this.error = error
          }
        )
    }
  }
}

AuthLogin.$inject = ['$scope', '$stateParams', '$state', '$window', 'AuthService']