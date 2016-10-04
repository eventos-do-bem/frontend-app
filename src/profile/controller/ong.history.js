export default class OngHistory {
  constructor($rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents({closed: true})
      .then(
        response => {
          this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-warning', message: `Você tem ${response.data.values.length} campanhas encerradas.`})
          this.events = response.data.values.map(event => {
            event.ends = new Date(event.ends)
            return event
          })
          // console.log(this.events)
        }
      )
  }
}

OngHistory.$inject = ['$rootScope','ProfileService']