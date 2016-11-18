class EventReport {
  constructor($stateParams,EventService,StorageService) {
    this.service = EventService
    this.user = StorageService.getItem('user')
    if ($stateParams.uuid) {
      this.getReport($stateParams.uuid)
    }
  }
  getReport(id) {
    this.service.getReportPublic(id)
      .then(
        response => {
          console.log(response.data)
          this.report = response.data
        },
        error => console.error(error)
      )
  }
}

EventReport.$inject = ['$stateParams','EventService','StorageService']

export default EventReport