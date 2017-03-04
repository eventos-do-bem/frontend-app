export default class UserEventsRemoveDenied {
  constructor($uibModalInstance, event) {
    this.instance = $uibModalInstance
    this.event = event
  }
  ok() {
    this.instance.close({event: this.event})
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

UserEventsRemoveDenied.$inject = ['$uibModalInstance', 'event']