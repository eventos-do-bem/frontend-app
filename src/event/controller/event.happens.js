export default class EventHappens {
  constructor($uibModalInstance,data) {
    this.instance = $uibModalInstance
    this.institution = data.institution
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

EventHappens.$inject = ['$uibModalInstance','data']