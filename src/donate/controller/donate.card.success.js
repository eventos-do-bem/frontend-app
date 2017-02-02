export default class DonateCardSuccess {
  constructor($uibModalInstance, data) {
    this.instance = $uibModalInstance
    this.data = data
  }
  ok() {
    this.instance.close()
  }
}

DonateCardSuccess.$inject = ['$uibModalInstance', 'data']