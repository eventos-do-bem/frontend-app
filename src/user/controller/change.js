export default class UserChange {
  constructor($scope, $stateParams, $state, $filter, UserService) {
    this.filter = $filter
    this.service = UserService
    this.me = () => {
      UserService.me()
        .then(
          response => {
            console.log(response)
            this.me = response.data
            this.user = response.data
          },
          error => {
            console.error('error: ',error)
          })
    }
  }
  change(user) {
    birthdate = user.birthdate.split('/')
    user.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'yyyy-MM-dd')
    this.service.change(user)
      .then(
        response => {
          console.log(response)
        }
      )
  }
}

UserChange.$inject = ['$scope', '$stateParams', '$state', '$filter', 'UserService']