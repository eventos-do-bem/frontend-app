export default class EventDonateCard {
  constructor($uibModalInstance, donate, EventService) {
    this.instance = $uibModalInstance
    this.eventService = EventService
    this.donate = donate
    this.donate.data['is_anonymous'] = false
  }
  buildCard() {
    this.donate.data['message'] = this.donate.message
    delete this.donate.message
    console.log(this.donate)
    this.eventService.pay(this.donate.uuid, this.donate.data)
      .then(response => {
        this.instance.close(response.data)
      })
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

EventDonateCard.$inject = ['$uibModalInstance', 'donate', 'EventService']