export default class UserEvents {
  constructor($scope, $rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.rootScope.$broadcast('alert', {type: 'alert-info', icon: 'fa-warning', message: ` Veja nosso <a href="#">kit</a> para bombar suas campanhas!`})
    this.pagination_open = { current_page: 1 }
    this.pagination_closed = { current_page: 1 }
    this.getEventsOpen()
    this.getEventsClosed()
  }
  getEventsOpen() {
    this.service.getEvents({
      open: true,
      page: this.pagination_open.current_page
    }).then(response => {
      this.pagination_open = response.data.meta.pagination
      this.events_open = response.data.values.map(event => {
        event.ends = new Date(event.ends)
        return event
      })
    })
  }
  changePageOpen() {
    this.getEventsOpen()
  }
  getEventsClosed() {
    this.service.getEvents({
      closed: true,
      page: this.pagination_closed.current_page
    }).then(response => {
      this.pagination_closed = response.data.meta.pagination
      this.events_closed = response.data.values.map(event => {
        event.ends = new Date(event.ends)
        return event
      })
    })
  }
  changePageClosed() {
    this.getEventsClosed()
  }
}

UserEvents.$inject = ['$scope','$rootScope','ProfileService']