export default class OngPage {
  constructor(profile,InstitutionService,$rootScope,StorageService) {
    this.profile = profile.data
    this.service = InstitutionService
    this.rootScope = $rootScope
    this.storage = StorageService
    this.getInstitution(profile.data.institutions.uuid)
  }
  getInstitution(id) {
    this.service.findById(id)
      .then(response => {
        delete response.data.cover
        delete response.data.avatar
        this.page = response.data
        console.log(this.page)
      })
  }
  save(data) {
    console.log(data)
    this.service.savePage(data, progress => {
      this.progress = progress
    }).then(
        response => {
          let profile = this.storage.getItem('profile')
          profile.avatar = response.data.user.avatar
          this.storage.setItem('profile', profile)
          this.rootScope.$broadcast('profile.change')
          
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

OngPage.$inject = ['profile','InstitutionService','$rootScope','StorageService']