export default class OngEvents {
  constructor($rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.pendings = 0
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents({})
      .then(
        response => {
          this.pendings = response.data.values.filter(event => {
            return (event.needReport == true)
          })
          this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-warning', message: `Você tem ${this.pendings.length} relatórios pendentes.`})
          this.events = response.data.values.map(event => {
            event.ends = new Date(event.ends)
            return event
          })
          // console.log(this.events)
        }
      )
  }
}

OngEvents.$inject = ['$rootScope','ProfileService']