export default class Page {
  constructor($rootScope, $filter, $stateParams, $sce, $uibModal, $location, $anchorScroll, InstitutionService, ProfileService, NotificationService, ValidationFactory, StorageService) {
    this.rootScope = $rootScope
    this.filter = $filter
    this.location = $location
    this.anchorScroll = $anchorScroll
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
    } else {
      this.donateProfile = {}
    }
    if ($stateParams.slug) {
      this.findInstitution($stateParams.slug)
    }
  }
  getProfile() {
    this.profileService.me()
      .then(
        response => {
          this.profile = response.data
          this.donateProfile = angular.copy(response.data)
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
  donate(institution) {
    let modalInstance = this.modal.open({
      templateUrl: './../src/donate/view/donate.impulse.html',
      controller: 'DonateImpulse',
      controllerAs: 'ctrl',
      windowClass: 'modal-donate',
      resolve: {
        institution: institution,
        donate: this.donateProfile
      }
    })
    modalInstance.result.then(response => {
      this.donateProfile = response
      this.rootScope.$broadcast('alert-clear')
      if (response && response.errors) {
        this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: response})
        this.location.hash('body')
        this.anchorScroll()
      } 
    })
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

Page.$inject = ['$rootScope','$filter','$stateParams', '$sce', '$uibModal', '$location', '$anchorScroll','InstitutionService','ProfileService','NotificationService','ValidationFactory','StorageService']