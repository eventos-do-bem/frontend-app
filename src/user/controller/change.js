export default class UserChange {
  constructor($scope, $stateParams, $state, UserService) {
    this.me = () => {
      UserService.me()
        .then(
          response => {
            this.me = response.data
          },
          error => {
            console.error('error: ',error)
          })
    }
  }
}

UserChange.$inject = ['$scope', '$stateParams', '$state', 'UserService']