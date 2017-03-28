export default class Event {
  constructor($rootScope, $state, $sce, $stateParams, $location, $uibModal, $timeout, EventService, StorageService, FacebookService, AuthService, ProfileService) {
    this.rootScope = $rootScope
    this.state = $state
    this.sce = $sce
    this.location = $location
    this.modal = $uibModal
    this.timeout = $timeout
    this.service = EventService
    this.facebook = FacebookService
    this.authService = AuthService
    this.profileService = ProfileService
    this.profile = StorageService.getItem('profile')
    this.accessLoginAnotherUser = this.profileService.getAccessLoginAnotherUser()
    this.event = {}
    if ($stateParams.slug) {
      this.slug = $stateParams.slug
      this.getEvent($stateParams.slug)
    }
    this.pagination = { current_page: 1 }
    this.rootScope.timeout = this.timeout(() => {
      this.openShare()
    }, 25000)

  }
  loginAsCreator(uuid) {
    this.authService.loginAnotherUser(uuid)
      .then(response => {
        this.profile = this.profileService.setProfile(response.data)
        this.accessLoginAnotherUser = this.profileService.getAccessLoginAnotherUser()
      })
  }
  openShare() {
    let modalInstance = this.modal.open({
      templateUrl: './../src/event/view/remember.share.html',
      controller: 'RememberShare',
      controllerAs: 'ctrl',
      windowClass: 'modal-share',
      resolve: {
        user: this.event.user
      }
    })
    modalInstance.result.then(response => {
      this.share()
    })
  }
  share() {
    let picture = (this.event.cover.medium.indexOf('http') > -1) ? this.event.cover.medium : `https://www.eventosdobem.com.br${this.event.cover.medium}`
    this.facebook.share({
      href: this.location.absUrl(),
      title: this.event.name,
      picture: picture,
      description: `Participe da campanha de: ${this.event.user.name}`,
      caption: `Projeto apoiado: ${this.event.institution.name}`
    })
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
          console.log(this.event)
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
      this.state.go('event.report', {uuid: event.uuid})
    } else {
      let modalInstance = this.modal.open({
        templateUrl: './../src/event/view/event.happens.html',
        controller: 'EventHappens',
        controllerAs: 'ctrl',
        size: 'md',
        resolve: {
          user: event.user
        }
      })
    }
  }
}

Event.$inject = ['$rootScope','$state', '$sce','$stateParams','$location','$uibModal','$timeout','EventService','StorageService','FacebookService','AuthService','ProfileService']