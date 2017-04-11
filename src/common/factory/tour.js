export default class TourFactory {
  constructor(TourService) {
    this.service = TourService
    this.tour = null
    this.order = 0
  }
  init(name) {
    if (name) {
      this.tour = this.service.getTourByName(name)
    } else {
      this.tour = this.service.getTour()
    }
    this.tour.on('stepChanged', data => {
      if (data) this.order = data.order
    })
    this.tour.on('ended', () => this.order = 0)
  }
  start(name) {
    if (!this.tour) {
      console.error('Nenhuma tour foi inicializada')
    } else {
      this.tour.startAt(this.order)
    }
  }
  static tourFactory(TourService) {
    return new TourFactory(TourService)
  }
}

TourFactory.tourFactory.$inject = ['uiTourService']