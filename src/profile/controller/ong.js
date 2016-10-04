export default class ProfileOng {
  constructor($scope, $window, $state, StorageService, ProfileService, profile) {
    this.service = ProfileService
    this.profile = profile.data
    this.getEvents()
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
  }
  getEvents() {
    this.service.getEvents({})
      .then(
        response => {
          this.needReport = response.data.values.filter(event => {
            return (event.needReport == true)
          }).length
        }
      )
  }
}

ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile']