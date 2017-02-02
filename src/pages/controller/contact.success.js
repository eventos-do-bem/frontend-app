export default class ContactSuccess {
  constructor($uibModalInstance) {
    this.instance = $uibModalInstance
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

ContactSuccess.$inject = ['$uibModalInstance']