export default class EventHappens {
  constructor($uibModalInstance,user) {
    this.instance = $uibModalInstance
    this.user = user
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

EventHappens.$inject = ['$uibModalInstance','user']