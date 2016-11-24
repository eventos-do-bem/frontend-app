class EventReport {
  constructor($stateParams,EventService,StorageService) {
    this.service = EventService
    this.user = StorageService.getItem('user')
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
    this.service.getReportPublic(id)
      .then(
        response => {
          console.log(response.data)
          this.report = response.data
          this.slides = [
            {
              id: 0,
              image: 'assets/images/perfil/carlos.jpg'
            },
            {
              id: 1,
              image: 'assets/images/perfil/fernanda.jpg'
            },
            {
              id: 2,
              image: 'assets/images/perfil/pedro.png'
            }
          ]
          console.log(this.slides)
        },
        error => console.error(error)
      )
  }
}

EventReport.$inject = ['$stateParams','EventService','StorageService']

export default EventReport