export default class Unavailable {
  constructor($uibModalInstance) {
    this.instance = $uibModalInstance
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

Unavailable.$inject = ['$uibModalInstance']