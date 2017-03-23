export default class OngReportSubmit {
  constructor($uibModalInstance) {
    this.instance = $uibModalInstance
  }
  close() {
    this.instance.close()
  }
}

OngReportSubmit.$inject = ['$uibModalInstance']