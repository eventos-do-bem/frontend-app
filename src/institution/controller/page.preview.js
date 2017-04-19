export default class PagePreview {
  constructor($rootScope, $stateParams, $sce, $location, $anchorScroll, InstitutionService) {
    this.rootScope = $rootScope
    this.sce = $sce
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.service = InstitutionService
    if ($stateParams.slug) {
      this.findInstitution($stateParams.slug)
    }
    this.rootScope.$broadcast('alert', {
      type: 'alert-info',
      icon: 'fa-exclamation-triangle',
      message: {
        message: 'Veja que esta é uma página de visualização que só você tem acesso, desta forma, não compartilhe este endereço (URL)!<br>Os botões e formulários também estão desabilitados, sendo apenas para visualização.'
      }
    })
  }
  findInstitution(slug) {
    this.service.findById(slug)
      .then(response => this.institution = response.data)
  }
  getTrustHtml(html) {
    return this.sce.trustAsHtml(html)
  }
  save(institution) {
    let data = angular.copy(institution)
    delete data.cover
    delete data.avatar
    if (data.video == null) delete data.video
    this.service.savePage(data, progress => {
      this.progress = progress
    }).then(
        response => {
          if (response.data.video == null) delete response.data.video
          this.institution = response.data
          this.rootScope.$broadcast('alert', {
            type: 'alert-success',
            icon: 'fa-check',
            message: {
              message: 'A posição da capa de sua página oficial foi salva com sucesso! :)'
            }
          })
          this.anchorScroll('body')
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

PagePreview.$inject = ['$rootScope','$stateParams', '$sce', '$location', '$anchorScroll','InstitutionService']