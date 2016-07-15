export default class UserRegister {
  constructor($scope, $stateParams, $state, UserService, FbService) {
    this.service = UserService
    this.fbService = FbService
    this.state = $state
    this.user = {
      gender: 'Feminino'
    }
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.validate = {
      email: "{'has-error':register.email.$error.email || register.email.$error.required}",
      password: "{'has-error':register.password.$error.required || register.password.$error.minlength}"
    }
  }
  toggleShowPassword() {
    // this.showPassword = !this.showPassword
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  registerFb() {
    this.fbService.login(
      response => {
        let { name, email, gender } = response
        gender = (gender == 'male') ? 'Masculino' : 'Feminino'
        this.user = {name: name, email: email, gender: gender }
        this.register()
      },
      error => {
        console.error(error)
      }
    )
  }
  register() {
    let user = angular.copy(this.user)
    if (user.birthdate) {
      let birthdate = user.birthdate.split('/')
      user.birthdate = `${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`
    }
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

UserRegister.$inject = ['$scope', '$stateParams', '$state', 'UserService', 'FbService']