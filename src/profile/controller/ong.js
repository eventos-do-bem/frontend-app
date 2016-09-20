export default class ProfileOng {
  constructor($scope, $window, $state, StorageService, ProfileService, profile) {
    this.profile = profile.data
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
  }
}

ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile']