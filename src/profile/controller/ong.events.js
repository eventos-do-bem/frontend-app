export default class OngEvents {
  constructor($rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.pendings = 0
    this.pagination = { current_page: 1 }
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents({
      withoutReport: true,
      page: this.pagination.current_page
    }).then(response => {
      this.pagination = response.data.meta.pagination
      this.events = response.data.values.map(event => {
        event.ends = new Date(event.ends)
        return event
      })
      this.pendings = response.data.values.filter(event => {
        return (event.needReport == true)
      })
      this.rootScope.$broadcast('alert', {
        type: 'alert-warning',
        icon: 'fa-warning',
        message: `Você tem ${this.pendings.length} relatórios pendentes.`
      })
    })
  }
  changePage() {
    this.getEvents()
  }
}

OngEvents.$inject = ['$rootScope','ProfileService']