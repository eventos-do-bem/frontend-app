export default class OngReportNotYet {
  constructor($uibModalInstance, event) {
    this.instance = $uibModalInstance
    this.event = event
  }
  close() {
    this.instance.close()
  }
}

OngReportNotYet.$inject = ['$uibModalInstance','event']