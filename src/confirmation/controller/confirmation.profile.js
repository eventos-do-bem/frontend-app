export default class ConfirmationProfile {
  constructor($rootScope, $stateParams, $state, $timeout, ProfileService, StorageService) {
    this.storage = StorageService
    this.rootScope = $rootScope
    this.state = $state
    this.timeout = $timeout
    this.profileService = ProfileService
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
            this.timeout(() => this.login(), 2000)
          },
          error => {
            this.error = error.data
            // console.log('error', error)
          }
        )
    }
  }
  login() {
    this.profileService.setProfile(this.profile)
    // this.storage.setItem('token', this.profile.token)
    // let {name, email, type} = this.profile
    // this.storage.setItem('profile', {name: name, email: email, type: type})
    // this.rootScope.$broadcast('profile.change')
    switch(this.profile.type) {
      case 'user': this.state.go('profile.user.configurations', { novo: true }); break;
      case 'ong': this.state.go('profile.ong.configurations'); break;
    }
  }
}

ConfirmationProfile.$inject = ['$rootScope', '$stateParams', '$state', '$timeout', 'ProfileService', 'StorageService']