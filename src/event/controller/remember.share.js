export default class RememberShare {
  constructor($uibModalInstance, user) {
    this.instance = $uibModalInstance
    this.user = user
  }
  share() {
    this.instance.close()
  }
  close() {
    this.instance.dismiss()
  }
}

RememberShare.$inject = ['$uibModalInstance','user']