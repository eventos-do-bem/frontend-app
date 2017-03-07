export default class Page {
  constructor($filter, $stateParams, $sce, $uibModal, InstitutionService, ProfileService, NotificationService, ValidationFactory, StorageService) {
    this.filter = $filter
    this.sce = $sce
    this.modal = $uibModal
    this.service = InstitutionService
    this.profileService = ProfileService
    this.notification = NotificationService
    this.validation = ValidationFactory
    this.storage = StorageService
    this.profile = this.storage.getItem('profile')
    if (this.profile && this.profile.type == 'user') {
      this.getProfile()
    }
    if ($stateParams.slug) {
      this.findInstitution($stateParams.slug)
    }
  }
  getProfile() {
    this.profileService.me()
      .then(
        response => {
          let {name, birthdate, email, type} = response.data
          this.profile.birthdate = this.filter('date')(birthdate, 'dd/MM/yyyy'),
          this.birthday = {
            name: name,
            birthdate: this.filter('date')(birthdate, 'dd/MM/yyyy'),
            email: email,
            type: type
          }
        }
      )
  }
  findInstitution(slug) {
    this.service.findById(slug)
      .then(response => {
        this.institution = response.data
      })
  }
  getTrustHtml(html) {
    return this.sce.trustAsHtml(html)
  }
  validateDate(field, date) {
    date = date.split('/')
    date = new Date(`${date[2]}-${date[1]}-${date[0]}`)
    if (!field.$error.mask) {
      let valid = (
        this.validation.dateMinByYears(date, 18) &&
        this.validation.dateMaxByYears(date, 121)
      )
      field.$setValidity('age', valid)
    }
  }
  subscribe(data) {
    data.institution_uuid = this.institution.uuid
    this.notification.subscribe(data)
      .then(
        response => {
          this.response = {
            status: true,
            icon: 'fa-hourglass-half',
            message: 'Seu aniversário está quase cadastrado, verifique sua caixa de e-mail para confirmar e concluir sua assinatura.'
          }
          this.birthday = {}
        },
        error => {
          this.response = {
            status: false,
            icon: 'fa-exclamation',
            message: 'Ops, algo errado aconteceu, infelizmente seu aniversário não foi cadastrado, entre em contato conosco :('
          }
        }
      )
  }
}

Page.$inject = ['$filter','$stateParams', '$sce', '$uibModal','InstitutionService','ProfileService','NotificationService','ValidationFactory','StorageService']