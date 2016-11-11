export default class ProfileUser {
  constructor($scope, $rootScope, $window, $state, $timeout, StorageService, ProfileService, profile) {
    this.service = ProfileService
    this.profile = profile.data
    this.rootScope = $rootScope
    this.timeout = $timeout
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
    // this.getEvents()
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

ProfileUser.$inject = ['$scope', '$rootScope', '$window', '$state', '$timeout', 'StorageService', 'ProfileService', 'profile']