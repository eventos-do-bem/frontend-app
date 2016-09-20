export default class AuthLogout {
  constructor($rootScope, $stateParams, $state, $window, AuthService, StorageService) {
    this.authService = AuthService
    this.storageService = StorageService
    this.$rootScope = $rootScope
    this.$window = $window
    this.logout()
  }
  logout() {
    // let storage = this.storageService.identifyStorage()
    // console.log(storage)
    // this.storageService.clearStorage()
    this.authService.logout()
      .then(
        response => {
          this.$rootScope.$broadcast('auth.logout')
        },
        error => {
          console.error('error', error)
          this.$window.localStorage.removeItem('rememberme')
          this.$window.localStorage.removeItem('token')
          this.$window.localStorage.removeItem('profile')
          this.$rootScope.$broadcast('auth.logout')
        }
      )
  }
}

AuthLogout.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService', 'StorageService']