export default class UserMe {
  constructor($scope, $window, $state, StorageService, UserService, me) {
    this.me = me.data
    $scope.$on('user.change', () => {
      this.me = StorageService.getItem('user')
    })
  }
}

UserMe.$inject = ['$scope', '$window', '$state', 'StorageService', 'UserService', 'me']