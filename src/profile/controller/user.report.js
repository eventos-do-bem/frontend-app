export default class UserReport {
  constructor(EventService, ProfileService, $stateParams) {
    this.service = EventService
    this.profileService = ProfileService
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid)
    }
  }
  getEvent(id) {
    let event
    this.service.findById(id)
      .then(
        response => {
          event = response.data
          event.progress = (event.total_receive / event.goal) * 100
          this.event = event
          this.profileService.getEventPayments(id)
            .then(
              response => {
                console.log(response.data.values)
                this.donors = response.data.values.map(donor => {
                  donor.updated_at = new Date(donor.updated_at)
                  return donor
                })
              }
            )
        }
      )
  }
}

UserReport.$inject = ['EventService','ProfileService','$stateParams']