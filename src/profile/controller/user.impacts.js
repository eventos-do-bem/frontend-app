export default class UserImpacts {
  constructor($scope, ProfileService) {
    this.service = ProfileService
    this.pagination = { current_page: 1 }
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents({
      withReportOrClosed: true,
      page: this.pagination.current_page
    }).then(response => {
      this.pagination = response.data.meta.pagination
      this.events = response.data.values.map(event => {
        event.ends = new Date(event.ends)
        return event
      })
    })
  }
  changePage() {
    this.getEventsOpen()
  }
}

UserImpacts.$inject = ['$scope','ProfileService']