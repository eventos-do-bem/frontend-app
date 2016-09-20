export default class UserEvents {
  constructor(ProfileService) {
    this.service = ProfileService
    this.pendings = 0
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents()
      .then(
        response => {
          this.pendings = response.data.values.filter(event => {
            return (event.needReport == true)
          })
          console.log(this.pendings)
          this.events = response.data.values.map(event => {
            event.ends = new Date(event.ends)
            return event
          })
          // console.log(this.events)
        }
      )
  }
}

UserEvents.$inject = ['ProfileService']