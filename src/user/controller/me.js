export default class UserMe {
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

UserMe.$inject = ['$scope', '$stateParams', '$state', 'UserService']