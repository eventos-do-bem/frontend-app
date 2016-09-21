export default class ProfileUser {
  constructor($scope, $window, $state, StorageService, ProfileService, profile) {
    this.service = ProfileService
    this.profile = profile.data
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents()
      .then(
        response => {
          this.needReport = response.data.values.filter(event => {
            return (event.needReport == true)
          }).length
        }
      )
  }
}

ProfileUser.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile']