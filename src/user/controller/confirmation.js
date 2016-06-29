export default class AuthConfirmation {
  constructor($rootScope, $stateParams, $state, $window, AuthService) {
    this.user = {
      uuid: $stateParams.uuid,
      confirmation_code: $stateParams.confirmation_code
    }
    this.confirmation = () => {
      console.log(this.user)
      // AuthService.confirmation(this.user)
      //   .then(
      //     response => {
      //       $window.localStorage.setItem('token', response.data.token)
      //       delete response.data.token
      //       $window.localStorage.setItem('user', JSON.stringify(response.data))
      //       $rootScope.$broadcast('auth.login')
      //     },
      //     error => {
      //       this.error = error.data
      //       console.log('error', error)
      //     }
      //   )
    }
  }
}

AuthConfirmation.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService']