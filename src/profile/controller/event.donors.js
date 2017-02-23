export default class EventDonors {
  constructor(EventService, ProfileService, $stateParams, $uibModal, StorageService) {
    this.service = EventService
    this.profileService = ProfileService
    this.modal = $uibModal
    this.storage = StorageService
    if ($stateParams.uuid) {
      this.uuid = $stateParams.uuid
      this.getEvent()
    }
    this.pagination = { current_page: 1 }
    this.profile = this.storage.getItem('profile')
  }
  getEvent() {
    let event
    this.service.findById(this.uuid)
      .then(
        response => {
          event = response.data
          event.progress = Math.round((event.total_receive / event.goal) * 100)
          this.getPayments()
          this.event = event
        }
      )
  }
  getPayments() {
    this.profileService.getEventPayments(this.uuid, {
      page: this.pagination.current_page,
      updated_at: 'DESC'
    }).then(
      response => {
        this.pagination = response.data.meta.pagination
        this.donors = response.data.values.map(donor => {
          donor.updated_at = new Date(donor.updated_at)
          return donor
        })
      })
  }
  changePage() {
    this.getPayments()
  }
  unAvailable() {
    let modalInstance = this.modal.open({
      templateUrl: './../src/profile/view/unavailable.html',
      controller: 'Unavailable',
      controllerAs: 'ctrl'
    })
  }
}

EventDonors.$inject = ['EventService','ProfileService','$stateParams','$uibModal','StorageService']