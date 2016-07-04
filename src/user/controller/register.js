export default class UserRegister {
  constructor($scope, $stateParams, $state, $filter, UserService) {
    // this.user = {
    //   birthdate: $filter('date')(new Date(), 'dd-MM-yyyy')
    // }
    // console.log(this.user)
    this.register = () => {
      this.user.birthdate = $filter('date')(this.user.birthdate, 'yyyy-MM-dd')
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

UserRegister.$inject = ['$scope', '$stateParams', '$state', '$filter', 'UserService']