export default class AuthRecovery {
  constructor(AuthService, $state, $stateParams, StorageService, $rootScope, $window) {
    this.service = AuthService
    this.state = $state
    this.storage = StorageService
    this.rootScope = $rootScope
    this.window = $window
    // this.profile = {}
    if ($stateParams.token && $stateParams.email) {
      this.recovery = {
        'password-token': $stateParams.token,
        'email': $stateParams.email
      }
    }
  }
  reset(recovery) {
    this.error = false
    this.service.reset(recovery)
      .then(
        response => {
          let {name, email, type, avatar, token} = response.data
          this.storage.setItem('token', token)
          this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar})
          this.rootScope.$broadcast('profile.change')
          switch(type) {
            case 'user': this.state.go('profile.user.events'); break;
            case 'ong': this.state.go('profile.ong.events'); break;
          }
        },
        error => {
          console.error(error)
          this.error = error.data
          recovery = {}
        }
      )
  }
}

AuthRecovery.$inject = ['AuthService', '$state', '$stateParams', 'StorageService', '$rootScope', '$window']