export default class OngPage {
  constructor(profile,InstitutionService,$rootScope,$state,$anchorScroll,$timeout,Regex,StorageService,ProfileService,TourFactory) {
    this.profile = profile.data
    this.service = InstitutionService
    this.rootScope = $rootScope
    this.state = $state
    this.anchorScroll = $anchorScroll
    this.timeout = $timeout
    this.storage = StorageService
    this.profileService = ProfileService
    this.tour = TourFactory
    this.urlPattern = Regex.URL
    this.getInstitution(profile.data.institutions.uuid)
  }
  initTour() {
    this.tour.init('ongPageTour')
    this.tour.start()
  }
  getInstitution(id) {
    this.service.findById(id)
      .then(response => {
        if (response.data.video == null) delete response.data.video
        delete response.data.cover
        delete response.data.avatar
        this.page = response.data
      })
  }
  save(data, redirect) {
    if (data.video && data.video.trim().indexOf('http') != 0) {
      data.video = 'http://' + data.video
    }
    this.service.savePage(data, progress => {
      this.progress = progress
    }).then(
        response => {
          this.profile.avatar = response.data.user.avatar
          this.profileService.setProfile(this.profile)
          if (response.data.video == null) delete response.data.video
          delete response.data.cover
          delete response.data.avatar
          this.page = response.data
          
          if (!redirect) {
            this.rootScope.$broadcast('alert', {
              type: 'alert-success',
              icon: 'fa-check',
              message: {
                message: 'Página oficial salva com sucesso! :)'
              }
            })
            this.anchorScroll('body')
          } else {
            this.state.go('institution.page', {slug: data.slug})
          }
        },
        error => {
          this.rootScope.$broadcast('alert', {
            type: 'alert-danger',
            icon: 'fa-exclamation',
            message: error.data
          })
          this.anchorScroll('body')
        }
      )
  }
}

OngPage.$inject = ['profile','InstitutionService','$rootScope','$state','$anchorScroll','$timeout','Regex','StorageService','ProfileService','TourFactory']