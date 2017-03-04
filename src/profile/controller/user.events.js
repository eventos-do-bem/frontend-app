export default class UserEvents {
  constructor($scope, $rootScope, $uibModal, $state, $location, $anchorScroll, ProfileService, EventService) {
    this.rootScope = $rootScope
    this.modal = $uibModal
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.service = ProfileService
    this.eventService = EventService
    this.rootScope.$broadcast('alert', {type: 'alert-info', icon: 'fa-info-circle', message: { message: `Veja nosso <a href="https://drive.google.com/open?id=0B5mOKvkRV-iYMHZxX1pLdUMtcXM" target="_blank">KIT</a> para bombar suas campanhas!` }})
    this.pagination = { current_page: 1 }
    // this.pagination_closed = { current_page: 1 }
    this.getEvents()
    this.go = $state.go.bind($state)
    // this.getEventsClosed()
  }
  getEvents() {
    this.service.getEvents({
      opened: true,
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
  remove(event) {
    // console.log(event)
    if (event.hasAnyDonate) {
      this.canNotBeRemoved(event)
    } else {
      this.removeConfirm(event)
    }
  }
  canNotBeRemoved(event) {
    let modalInstance = this.modal.open({
      templateUrl: './../src/profile/view/user.events.remove.denied.html',
      controller: 'UserEventsRemoveDenied',
      controllerAs: 'ctrl',
      resolve: {
        event: event
      }
    })
  }
  removeConfirm(event) {
    let modalInstance = this.modal.open({
      templateUrl: './../src/profile/view/user.events.remove.confirm.html',
      controller: 'UserEventsRemoveConfirm',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        event: event
      }
    })
    modalInstance.result.then(event => {
      this.eventService.remove(event.uuid)
        .then(
          response => {
            this.getEvents()
            this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: { message: 'Evento excluído com sucesso!' }})
            this.location.hash('body')
            this.anchorScroll()
          },
          error => {
            this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-exclamation', message: error.data})
            this.location.hash('body')
            this.anchorScroll()
          }
        )
    })
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

UserEvents.$inject = ['$scope','$rootScope','$uibModal','$state', '$location', '$anchorScroll','ProfileService','EventService']