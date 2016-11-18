export default class ProfileOng {
  constructor($scope, $window, $state, StorageService, ProfileService, profile) {
    this.service = ProfileService
    this.profile = profile.data
    this.getEventsWithoutReport()
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
  }
  getEventsWithoutReport() {
    this.service.getEvents({ onlyEnabledToReceiveReport: true, total: true })
      .then(response => this.onlyEnabledToReceiveReport = response.data.total)
  }
}

ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile']