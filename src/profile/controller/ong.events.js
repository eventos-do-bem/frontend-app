export default class OngEvents {
  constructor(ProfileService) {
    this.service = ProfileService
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents()
      .then(
        response => console.log(response)
      )
  }
}

OngEvents.$inject = ['ProfileService']