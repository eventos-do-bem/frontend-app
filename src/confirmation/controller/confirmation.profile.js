export default class ConfirmationProfile {
  constructor($rootScope, $stateParams, $state, $window, ProfileService, StorageService) {
    this.storage = StorageService
    this.rootScope = $rootScope
    this.state = $state
    this.window = $window
    this.confirmation = false
    if ($stateParams.uuid && $stateParams.confirmation_code) {
      let profile = {
        uuid: $stateParams.uuid,
        confirmation_code: $stateParams.confirmation_code
      }
      ProfileService.confirmation(profile)
        .then(
          response => {
            this.confirmation = true
            // console.log(response)
            this.profile = response.data
          },
          error => {
            this.error = error.data
            // console.log('error', error)
          }
        )
    }
  }
  login() {
    this.storage.setItem('token', this.profile.token)
    let {name, email, type} = this.profile
    this.storage.setItem('profile', {name: name, email: email})
    this.rootScope.$broadcast('profile.change')
    switch(type) {
      case 'user': this.state.go('profile.user'); break;
      case 'ong': this.state.go('profile.ong'); break;
    }
  }
}

ConfirmationProfile.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'ProfileService', 'StorageService']