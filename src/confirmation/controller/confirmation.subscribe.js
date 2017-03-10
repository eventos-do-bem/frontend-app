export default class ConfirmationSubscribe {
  constructor($rootScope, $stateParams, $state, $window, NotificationService) {
    this.confirmation = false
    this.notificationService = NotificationService
    if ($stateParams.uuid) {
      this.subscribeConfirm($stateParams.uuid)
    }
  }
  subscribeConfirm(uuid) {
    this.notificationService.subscribeConfirm(uuid)
      .then(response => {
        this.confirmation = true
      })
  }
}

ConfirmationSubscribe.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'NotificationService']