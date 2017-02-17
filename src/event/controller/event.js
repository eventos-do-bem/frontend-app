export default class Event {
  constructor($rootScope, $state, $sce, $stateParams, $uibModal, EventService, StorageService) {
    this.rootScope = $rootScope
    this.state = $state
    this.sce = $sce
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
          // console.log(this.event)
          if (this.event.messages.contains) {
            this.getMessages(this.slug, {})
          }
        }
      )
  }
  getTrustHtml(html) {
    return this.sce.trustAsHtml(html)
  }
  seeWhatHappens(event) {
    if (event.report) {
      this.state.go('event.report', {uuid: event.institution.uuid})
    } else {
      let modalInstance = this.modal.open({
        templateUrl: './../src/event/view/event.happens.html',
        controller: 'EventHappens',
        controllerAs: 'ctrl',
        size: 'md',
        resolve: {
          data: () => {
            return {
              institution: event.institution
            }
          }
        }
      })
    }
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

Event.$inject = ['$rootScope','$state', '$sce','$stateParams','$uibModal','EventService','StorageService']