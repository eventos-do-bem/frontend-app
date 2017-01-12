export default class Event {
  constructor($rootScope, $state, $stateParams, $uibModal, EventService, StorageService) {
    this.rootScope = $rootScope
    this.state = $state
    this.modal = $uibModal
    this.service = EventService
    this.profile = StorageService.getItem('profile')
    this.event = {}
    if ($stateParams.slug) {
      this.slug = $stateParams.slug
      this.getEvent($stateParams.slug)
    }
    this.pagination = { current_page: 1 }
  }
  getMessages(id, params = null) {
    let method = (this.profile) ? 'getMessages' : 'getMessagesPublic'
    params.page = this.pagination.current_page
    this.service[method](id, params)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.event.messages = response.data
        console.log(this.event)
      })
  }
  getEvent(id) {
    this.service.findById(id)
      .then(
        response => {
          let event
          event = response.data
          event.ends = new Date(event.ends)
          event.progress = Math.floor((event.total_receive / event.goal) * 100)
          this.event = event
          console.log(this.event)
          if (this.event.messages.contains) {
            this.getMessages(this.slug, {})
          }
        }
      )
  }
  seeWhatHappens() {
    let modalInstance = this.modal.open({
      templateUrl: './../src/event/view/event.happens.html',
      controller: 'EventHappens',
      controllerAs: 'ctrl',
      size: 'md',
      resolve: {
        data: () => {
          return {
            institution: this.event.institution
          }
        }
      }
    })
    // modalInstance.result.then(response => {
    //   this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.data.status})
    //   this.anchorScroll('scrollArea')
    //   this.timeout(() => {
    //     this.state.go('event.slug', {slug: response.uuid})
    //   }, 3000)
    // }, error => {
    //   this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error})
    // }
    // )
  }
}

Event.$inject = ['$rootScope','$state','$stateParams','$uibModal','EventService','StorageService']