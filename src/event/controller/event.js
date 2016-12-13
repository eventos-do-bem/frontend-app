export default class Event {
  constructor($rootScope, $state, $stateParams, EventService, StorageService) {
    this.rootScope = $rootScope
    this.$state = $state
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
          if (this.event.messages.contains) {
            this.getMessages(this.slug, {})
          }
        }
      )
  }
}

Event.$inject = ['$rootScope','$state','$stateParams','EventService','StorageService']