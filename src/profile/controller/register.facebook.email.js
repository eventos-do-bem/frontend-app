export default class RegisterFacebookEmail {
  constructor($uibModalInstance, user) {
    this.instance = $uibModalInstance
    this.email = user.email
    this.user = angular.copy(user)
    delete this.user.email
  }
  ok() {
    this.instance.close(this.user)
  }
}

RegisterFacebookEmail.$inject = ['$uibModalInstance', 'user']