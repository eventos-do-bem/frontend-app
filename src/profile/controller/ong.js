export default class ProfileOng {
  constructor($scope, $window, $state, StorageService, ProfileService) {
    this.service = ProfileService
    this.profile = ProfileService.getProfile()
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

ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService']