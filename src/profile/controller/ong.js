export default class ProfileOng {
  constructor($scope, $window, $state, StorageService, ProfileService, profile) {
    this.service = ProfileService
    this.profile = profile.data
    this.getOpenNeedReport()
    this.getClosedNeedReport()
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
  }
  getOpenNeedReport() {
    this.service.getEvents({
      open: true
    }).then(
        response => {
          this.openNeedReport = response.data.values.filter(event => {
            return (event.needReport == true)
          }).length
        }
      )
  }
  getClosedNeedReport() {
    this.service.getEvents({
      open: false
    }).then(
        response => {
          this.closedNeedReport = response.data.values.filter(event => {
            return (event.needReport == true)
          }).length
        }
      )
  }
}

ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile']