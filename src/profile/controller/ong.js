export default class ProfileOng {
  constructor($scope, $window, $state, $timeout, StorageService, ProfileService, TourFactory) {
    this.service = ProfileService
    this.profile = ProfileService.getProfile()
    this.state = $state
    this.timeout = $timeout
    this.storage = StorageService
    this.tour = TourFactory
    this.getEventsWithoutReport()
    if (this.profile.last_login == null) {
      $timeout(() => {
        this.initTour()
      })
    }
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
  }
  initTour() {
    this.tour.init('ongTour')
    this.tour.start()
  }
  getEventsWithoutReport() {
    this.service.getEvents({ onlyEnabledToReceiveReport: true, total: true })
      .then(response => this.onlyEnabledToReceiveReport = response.data.total)
  }
}

ProfileOng.$inject = ['$scope', '$window', '$state', '$timeout', 'StorageService', 'ProfileService', 'TourFactory']