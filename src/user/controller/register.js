export default class UserRegister {
  constructor($scope, $stateParams, $state, $filter, $timeout, UserService) {
    this.service = UserService
    this.timeout = $timeout
    this.state = $state
    this.filter = $filter
    this.user = {
      gender: 'Feminino',
    }
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.occupations = [{
      id: 1,
      label: 'Animais abandonados'
    }]
  }
  toggleShowPassword() {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  changeTab(active) {
    this.changeStep()
    switch(active) {
      case 0: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="organization"]').focus(), 300); break;
      case 1: this.timeout(() => document.querySelector('form[name="registerUser"] input[name="name"]').focus(), 300); break;
    }
  }
  changeStep(direction) {
    switch(direction) {
      case 'next': this.step++; break;
      case 'prev': this.step--; break;
      default: this.step = 0
    }
    switch(this.step) {
      case 0: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="organization"]').focus(), 300); break;
      case 1: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="phone"]').focus(), 300); break;
      case 2: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="name"]').focus(), 300); break;
    }
  }
  registerFacebook() {
    this.service.registerFacebook(response => {
      this.register(response)
    })
  }
  checkOfAge(age) {
    let date = new Date(),
        timeDiff = date - age,
        diffDays = timeDiff / (1000 * 3600 * 24 * 365)
    return (diffDays < 18) ? false : true

  }
  register(user) {
    user = (user) ? angular.copy(user) : angular.copy(this.user)
    let birthdate
    if (user.facebook_token) {
      user.gender = (user.gender == 'male') ? 'Masculino' : 'Feminino'
      birthdate = user.birthday.split('/')
      user.birthdate = new Date(`${birthdate[2]}-${birthdate[0]}-${birthdate[1]}`)
    } else {
      birthdate = user.birthdate.split('/')
      user.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    }
    if (!this.checkOfAge(user.birthdate)) {
      this.error = {
        errors: {
          birthdate: ['Desculpe, não podemos aceitar usuários menores de idade.']
        }
      }
    } else {
      user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'yyyy-MM-dd')
      this.service.register(user)
        .then(
          response => this.registerSuccess(response),
          response => this.registerError(response)  
        )
    }
  }
  registerSuccess(response) {
    console.log(response)
  }
  registerError(response) {
    this.error = response.data
    console.error(response)
  }
}

UserRegister.$inject = ['$scope', '$stateParams', '$state', '$filter', '$timeout', 'UserService']