export default class ModalAuthLogin {
  constructor ($uibModalInstance, AuthService, ProfileService) {
    this.instance = $uibModalInstance
    this.service = AuthService
    this.profileService = ProfileService
    this.masterProfile = {}
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.profile = angular.copy(this.masterProfile)
  }
  toggleShowPassword () {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  loginFacebook () {
    this.service.loginFacebook(response => {
      this.login(response)
    })
  }
  login (profile) {
    profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    this.service.loginUser(profile)
      .then(
        response => this.loginSuccess(response),
        response => this.loginError(response)
      )
  }
  loginSuccess (response) {
    this.profileService.setProfile(response.data)
    this.instance.close(response.data)
  }
  loginError (response) {
    this.profile = angular.copy(this.masterProfile)
    this.error = {}
    if (response.data.errors) {
      this.error = response.data
    } else {
      this.error = {
        errors: {
          invalid: [response.data.message]
        }
      }
    }
    // this.instance.close(this.error)
  }
}

ModalAuthLogin.$inject = ['$uibModalInstance', 'AuthService', 'ProfileService']
