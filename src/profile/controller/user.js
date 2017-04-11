export default class ProfileUser {
  constructor($scope, $rootScope, $window, $state, $timeout, StorageService, ProfileService, profile, TourFactory) {
    this.service = ProfileService
    this.profile = profile.data
    this.rootScope = $rootScope
    this.window = $window
    this.state = $state
    this.timeout = $timeout
    this.storage = StorageService
    this.tour = TourFactory
    if (this.profile.last_login == null) {
      $timeout(() => {
        this.initTour()
      })
    }
    $scope.$on('profile.change', () => {
      this.profile = this.storage.getItem('profile')
    })
    // this.getEvents()
  }
  initTour() {
    this.tour.init('userTour')
    this.tour.start()
  }
  alert() {
    this.rootScope.$broadcast('alert', {type: 'alert-info', icon: 'fa-warning', message: 'mensagem'})
  }
  // getEvents() {
  //   this.service.getEvents()
  //     .then(
  //       response => {
  //         this.needReport = response.data.values.filter(event => {
  //           return (event.needReport == true)
  //         }).length
  //       }
  //     )
  // }
}

ProfileUser.$inject = ['$scope', '$rootScope', '$window', '$state', '$timeout', 'StorageService', 'ProfileService', 'profile', 'TourFactory']