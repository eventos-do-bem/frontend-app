export default class DonateBillet {
  constructor($uibModalInstance, donate) {
    this.instance = $uibModalInstance
    this.donate = donate
  }
  buildBillet(donate) {
    this.instance.close(donate)
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

DonateBillet.$inject = ['$uibModalInstance', 'donate']