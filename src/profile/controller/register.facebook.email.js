export default class RegisterFacebookEmail {
  constructor($uibModalInstance, user) {
    this.instance = $uibModalInstance
    this.user = user
  }
  ok() {
    this.instance.close(this.user)
  }
}

RegisterFacebookEmail.$inject = ['$uibModalInstance', 'user']