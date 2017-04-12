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
    // this.tour = this.uiTour.getTourByName('userTour')
    // this.tour.start()
    this.tour.init('userTour')
    this.tour.start()
  }
  // navigateToAndWaitFor(tour, path, stepId) {
  //   tour.next()
  //   tour.resume()
  //   tour.end()
  //   tour.startAt(stepId)
  //   this.state.go(path);
  //  return tour.waitFor(stepId)
  // }
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