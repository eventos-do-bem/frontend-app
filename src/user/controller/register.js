export default class UserRegister {
  constructor($scope, $stateParams, $state, UserService) {
    this.register = () => {
      console.log(this.user)
      // UserService.register(this.user)
      //   .then(
      //     response => {
      //       console.log(response)
      //     },
      //     error => {
      //       console.error(error)
      //     })
    }
  }
}

UserRegister.$inject = ['$scope', '$stateParams', '$state', 'UserService']