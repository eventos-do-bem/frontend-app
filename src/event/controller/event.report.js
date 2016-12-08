class EventReport {
  constructor($stateParams,EventService,StorageService) {
    this.service = EventService
    this.profile = StorageService.getItem('profile')
    if ($stateParams.uuid) {
      this.uuid = $stateParams.uuid
      this.getReport($stateParams.uuid)
    }
    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.active = 0;
    this.pagination = { current_page: 1 }
  }
  getRepeat(num) {
    return new Array(num)
  }
  getMessages(id, params) {
    let method = (this.profile) ? 'getMessages' : 'getMessagesPublic'
    params.page = this.pagination.current_page
    this.service[method](id, params)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.report.messages = response.data
      })
  }
  getReport(id) {
    let method = (this.profile) ? 'getReport' : 'getReportPublic'
    this.service[method](id)
      .then(
        response => {
          console.log(response.data)
          this.report = response.data
          this.getMessages(this.uuid, {})
          this.slides = []
          let x, picture
          for (x = 0; x < 3; x++) {
            picture = `picture${x + 1}`
            this.slides.push({
              id: x,
              image: this.report[picture].original
            })
          }
        },
        error => console.error(error)
      )
  }
}

EventReport.$inject = ['$stateParams','EventService','StorageService']

export default EventReport