export default class UserReport {
  constructor(EventService, $stateParams) {
    this.service = EventService
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid)
    }
  }
  getEvent(id) {
    this.service.findById(id)
      .then(
        response => this.event = response.data
      )
  }
}

UserReport.$inject = ['EventService','$stateParams']