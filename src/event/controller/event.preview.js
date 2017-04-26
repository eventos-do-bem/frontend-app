export default class EventPreview {
  constructor($rootScope, $sce, $stateParams, $location, $anchorScroll, EventService, StorageService) {
    this.rootScope = $rootScope
    this.sce = $sce
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.service = EventService
    this.profile = StorageService.getItem('profile')
    if ($stateParams.slug) {
      this.slug = $stateParams.slug
      this.getEvent($stateParams.slug)
    }
    this.rootScope.$broadcast('alert', {
      type: 'alert-info',
      icon: 'fa-exclamation-triangle',
      message: {
        message: 'Veja que esta é uma página de visualização que só você tem acesso, desta forma, não compartilhe este endereço (URL)!<br>Os botões também estão desabilitados, sendo apenas para visualização.'
      }
    })
    this.pagination = { current_page: 1 }
  }
  getTrustHtml(html) {
    return this.sce.trustAsHtml(html)
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
          let event = angular.copy(response.data)
          delete event.slug
          event.ends = new Date(event.ends)
          event.progress = Math.floor((event.total_receive / event.goal) * 100)
          event.goal_amount = event.goal
          event.video = angular.isUndefined(event.videos.values[0]) ? '' : event.videos.values[0].url
          event.categorie_uuid = event.categories.values[0].uuid
          event.institution_uuid = event.institution.uuid
          event.citie = event.cities.values[0].name
          this.event = event
          if (this.event.messages.contains) {
            this.getMessages(this.slug, {})
          }
        }
      )
  }
  save(event) {
    let data = angular.copy(event)
    delete data.cover
    if (data.video == null) delete data.video
    this.service.update(data, progress => this.progress = progress)
      .then(
        response => {
          if (response.data.video == null) delete response.data.video
          this.event = response.data
          this.rootScope.$broadcast('alert', {
            type: 'alert-success',
            icon: 'fa-check',
            message: {
              message: 'A posição da capa de seu evento foi salva com sucesso! :)'
            }
          })
          this.location.hash('body')
          this.anchorScroll()
        },
        error => {
          this.rootScope.$broadcast('alert', {
            type: 'alert-danger',
            icon: 'fa-exclamation',
            message: error.data
          })
          this.location.hash('body')
          this.anchorScroll()
        }        
      )
  }
}

EventPreview.$inject = ['$rootScope','$sce','$stateParams', '$location', '$anchorScroll', 'EventService','StorageService']