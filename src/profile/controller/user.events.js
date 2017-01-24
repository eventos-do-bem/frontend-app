export default class UserEvents {
  constructor($scope, $rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.rootScope.$broadcast('alert', {type: 'alert-info', icon: 'fa-info-circle', message: { message: `Veja nosso <a href="https://drive.google.com/open?id=0B5mOKvkRV-iYMHZxX1pLdUMtcXM" target="_blank">KIT</a> para bombar suas campanhas!` }})
    this.pagination = { current_page: 1 }
    // this.pagination_closed = { current_page: 1 }
    this.getEvents()
    // this.getEventsClosed()
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
    })
  }
  changePage() {
    this.getEvents()
  }
  // getEventsClosed() {
  //   this.service.getEvents({
  //     closed: true,
  //     page: this.pagination_closed.current_page
  //   }).then(response => {
  //     this.pagination_closed = response.data.meta.pagination
  //     this.events_closed = response.data.values.map(event => {
  //       event.ends = new Date(event.ends)
  //       return event
  //     })
  //   })
  // }
  // changePageClosed() {
  //   this.getEventsClosed()
  // }
}

UserEvents.$inject = ['$scope','$rootScope','ProfileService']