class EventReport {
  constructor($stateParams,EventService,StorageService) {
    this.service = EventService
    this.profile = StorageService.getItem('profile')
    if ($stateParams.uuid) {
      this.getReport($stateParams.uuid)
    }
    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.active = 0;
  }
  getRepeat(num) {
    return new Array(num)
  }
  getReport(id) {
    let method = (this.profile) ? 'getReport' : 'getReportPublic'
    this.service[method](id)
      .then(
        response => {
          console.log(response.data)
          this.report = response.data
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