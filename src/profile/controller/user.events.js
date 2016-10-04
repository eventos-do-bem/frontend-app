export default class UserEvents {
  constructor($scope, $rootScope, ProfileService) {
    this.rootScope = $rootScope
    this.service = ProfileService
    this.rootScope.$broadcast('alert', {type: 'alert-info', icon: 'fa-warning', message: ` Veja nosso <a href="#">kit</a> para bombar suas campanhas!`})
    this.getEvents()
    $scope.setPage = function(page) {
      this.current_page = page
    }
  }
  getEvents() {
    this.service.getEvents({open: true})
      .then(
        response => {
          this.pagination = response.data.meta.pagination
          console.log(this.pagination)
          this.events = response.data.values.map(event => {
            event.ends = new Date(event.ends)
            return event
          })
        }
      )
    this.service.getEvents({closed: true})
      .then(
        response => {
          this.events_closed = response.data.values.map(event => {
            event.ends = new Date(event.ends)
            return event
          })
        }
      )
  }
  pageChanged() {
    console.log(this.current_page)
  }
}

UserEvents.$inject = ['$scope','$rootScope','ProfileService']