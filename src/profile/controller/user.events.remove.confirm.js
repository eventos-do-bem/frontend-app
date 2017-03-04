export default class UserEventsRemoveConfirm {
  constructor($uibModalInstance, event) {
    this.instance = $uibModalInstance
    this.event = event
  }
  ok() {
    this.instance.close(this.event)
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

UserEventsRemoveConfirm.$inject = ['$uibModalInstance', 'event']