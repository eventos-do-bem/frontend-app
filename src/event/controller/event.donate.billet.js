export default class EventDonateBillet {
  constructor($uibModalInstance, donate, EventService, StorageService) {
    this.instance = $uibModalInstance
    this.eventService = EventService
    this.donate = donate
    this.donate.data['is_anonymous'] = false
    this.logged = StorageService.getItem('token')
  }
  buildBillet() {
    this.donate.data['message'] = this.donate.message
    delete this.donate.message
    this.donate.data['amount'] = this.donate.amount
    delete this.donate.amount
    console.log(this.donate)
    let method = (this.logged) ? 'printLoggedBillet' : 'printPublicBillet'
    this.eventService[method](this.donate.uuid, this.donate.data)
      .then(
        response => this.instance.close(response.data),
        error => this.instance.close(error.data)
      )
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

EventDonateBillet.$inject = ['$uibModalInstance', 'donate', 'EventService', 'StorageService']