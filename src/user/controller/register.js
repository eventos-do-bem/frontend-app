export default class UserRegister {
  constructor($scope, $stateParams, $state, UserService) {
    this.service = UserService
    this.state = $state
    this.user = {
      gender: 'Masculino'
    }
  }
  register() {
    let user = angular.copy(this.user)
    let birthdate = user.birthdate.split('/')
    user.birthdate = `${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`
    this.service.register(user)
      .then(
        response => this.registerSuccess(response),
        response => this.registerError(response)  
      )
  }
  registerSuccess(response) {
    console.log(response)
  }
  registerError(response) {
    this.error = response.data
    console.error(response)
  }
}

UserRegister.$inject = ['$scope', '$stateParams', '$state', 'UserService']