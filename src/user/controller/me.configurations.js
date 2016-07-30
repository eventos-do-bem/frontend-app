export default class UserMeConfigurations {
  constructor($filter, $rootScope, StorageService, UserService, user) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = UserService
    this.load(user)
  }
  load(user) {
    user = angular.copy(user.data)
    user.birthdate = new Date(user.birthdate)
    user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.user = user
  }
  save(user) {
    user = angular.copy(user)
    birthdate = user.birthdate.split('/')
    user.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'yyyy-MM-dd')
    this.service.change(user)
      .then(
        response => {
          this.storage.setItem('token', response.data.token)
          let {name, email} = response.data
          this.storage.setItem('user', {name: name, email: email})
          this.rootScope.$broadcast('user.change')
          this.user.password = '';
          this.user.new_password = '';
        }
      )
  }
}

UserMeConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'UserService', 'user']