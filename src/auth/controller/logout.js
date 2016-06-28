export default class AuthLogout {
  constructor($rootScope, $stateParams, $state, $window, AuthService) {
    this.logout = () => {
      AuthService.logout()
        .then(
          response => {
            $window.localStorage.clear()
            $rootScope.$broadcast('auth.logout')
          },
          error => {
            console.error('error', error)
          }
        )
    }
    this.logout()
  }
}

AuthLogout.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService']