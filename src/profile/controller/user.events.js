export default class UserEvents {
  constructor($rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.pendings = 0
    this.rootScope.$broadcast('alert', {type: 'alert-info', icon: 'fa-warning', message: ` Veja nosso <a href="#">kit</a> para bombar suas campanhas!`})
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents()
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

UserEvents.$inject = ['$rootScope','ProfileService']