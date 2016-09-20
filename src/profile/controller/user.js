export default class ProfileUser {
  constructor($scope, $window, $state, StorageService, ProfileService, profile) {
    this.profile = profile.data
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
    })
  }
}

ProfileUser.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile']