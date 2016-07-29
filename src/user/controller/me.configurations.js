export default class UserMeConfigurations {
  constructor($filter, UserService, user) {
    this.filter = $filter
    this.service = UserService
    this.user = user.data
  }
  save(user) {
    user = angular.copy(user)
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

UserMeConfigurations.$inject = ['$filter','UserService', 'user']