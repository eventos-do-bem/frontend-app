export default class UserRegister {
  constructor($scope, $stateParams, $state, $filter, UserService) {
    // this.user = {
    //   birthdate: $filter('date')(new Date(), 'dd-MM-yyyy')
    // }
    // console.log(this.user)
    // this.register = () => {
    //   this.user.birthdate = $filter('date')(this.user.birthdate, 'yyyy-MM-dd')
    //   UserService.register(this.user)
    //     .then(
    //       response => {
    //         console.log(response)
    //       },
    //       error => {
    //         console.error(error)
    //       })
    // }
    this.service = UserService
    this.user = {
      gender: 'Masculino'
    }
    this.registerAction = () => {
      let date = {
        day: this.user.birthdate.substring(0,2),
        month: this.user.birthdate.substring(2,4),
        year: this.user.birthdate.substring(4,8)
      }
      this.user.birthdate = `${date.year}-${date.month}-${date.day}`
      this.register(this.user)
        .then(response => console.log(response))
    }
  }
  register(user) {
    return this.service.register(user)
  }
}

UserRegister.$inject = ['$scope', '$stateParams', '$state', '$filter', 'UserService']