export default class UserConfirmation {
  constructor($rootScope, $stateParams, $state, $window, UserService, StorageService) {
    this.storage = StorageService
    this.rootScope = $rootScope
    this.state = $state
    this.window = $window
    this.confirmation = false
    if ($stateParams.uuid && $stateParams.confirmation_code) {
      let user = {
        uuid: $stateParams.uuid,
        confirmation_code: $stateParams.confirmation_code
      }
      UserService.confirmation(user)
        .then(
          response => {
            this.confirmation = true
            console.log(response)
            this.user = response.data
          },
          error => {
            this.error = error.data
            console.log('error', error)
          }
        )
    }
  }
  login() {
    this.storage.setItem('token', this.user.token)
    let {name, email} = this.user
    this.storage.setItem('user', {name: name, email: email})
    this.rootScope.$broadcast('user.change')
    this.state.go('user.me')
  }
}

UserConfirmation.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'UserService', 'StorageService']