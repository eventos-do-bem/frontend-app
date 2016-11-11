export default class OngPage {
  constructor(profile,InstitutionService,$rootScope) {
    this.profile = profile.data
    this.service = InstitutionService
    this.rootScope = $rootScope
    this.getInstitution(profile.data.institutions.uuid)
  }
  getInstitution(id) {
    this.service.findById(id)
      .then(response => {
        delete response.data.cover
        this.page = response.data
      })
  }
  save(data) {
    this.service.savePage(data, progress => {
      this.progress = progress
    }).then(
        response => {
          this.rootScope.$broadcast('alert', {
            type: 'alert-success',
            icon: 'fa-check',
            message: 'Página oficial salva com sucesso! :)'
          })
        },
        error => {
          this.rootScope.$broadcast('alert', {
            type: 'alert-danger',
            icon: 'fa-exclamation',
            message: 'Erro ao salvar página oficial! :('
          })
        }
      )
  }
}

OngPage.$inject = ['profile','InstitutionService','$rootScope']