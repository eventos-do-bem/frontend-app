export default class OngPage {
  constructor(profile,InstitutionService,$rootScope,Regex,StorageService,ProfileService) {
    this.profile = profile.data
    this.service = InstitutionService
    this.rootScope = $rootScope
    this.storage = StorageService
    this.profileService = ProfileService
    this.urlPattern = Regex.URL
    this.getInstitution(profile.data.institutions.uuid)
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
  save(data) {
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
          
          this.rootScope.$broadcast('alert', {
            type: 'alert-success',
            icon: 'fa-check',
            message: {
              message: 'Página oficial salva com sucesso! :)'
            }
          })
        },
        error => {
          this.rootScope.$broadcast('alert', {
            type: 'alert-danger',
            icon: 'fa-exclamation',
            message: error.data
          })
        }
      )
  }
}

OngPage.$inject = ['profile','InstitutionService','$rootScope','Regex','StorageService','ProfileService']