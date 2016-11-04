export default class OngPage {
  constructor(profile,InstitutionService,$rootScope) {
    this.profile = profile.data
    this.service = InstitutionService
    this.rootScope = $rootScope
    console.log(profile.data)
    delete profile.data.institutions.cover
    this.page = profile.data.institutions
    console.log(this.page)
  }
  save(data) {
    this.service.savePage(this.profile.institutions.uuid, data)
      .then(
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