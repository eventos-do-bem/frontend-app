export default class Event {
  constructor($state, $stateParams, EventService) {
    this.$state = $state
    this.service = EventService
    this.event = {}

    let event
    if ($stateParams.slug) {
      EventService.findById($stateParams.slug)
        .then(
          response => {
            console.log(response)
            event = response.data
            event.ends = new Date(event.ends)
            // event.total_receive = event.total_receive * 100
            this.event = event
          }
        )
    }
  }
}

Event.$inject = ['$state','$stateParams','EventService']