export default class AuthLogout {
  constructor($rootScope, $stateParams, $state, $window, AuthService) {
    this.authService = AuthService
    this.$rootScope = $rootScope
    this.state = $state
    this.$window = $window
    this.logout()
  }
  logout() {
    this.authService.logout()
      .then(
        response => {
          this.$rootScope.$broadcast('auth.logout')
          this.state.go('home')
        },
        error => {
          console.error('error', error)
          this.$rootScope.$broadcast('auth.logout')
        }
      )
  }
}

AuthLogout.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService']