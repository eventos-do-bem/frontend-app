export default class PagePreview {
  constructor($rootScope, $filter, $stateParams, $sce, $uibModal, $location, $anchorScroll, InstitutionService, ProfileService, AuthService, NotificationService, ValidationFactory, StorageService, FacebookService) {
    this.rootScope = $rootScope
    this.filter = $filter
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.sce = $sce
    this.modal = $uibModal
    this.service = InstitutionService
    this.profileService = ProfileService
    this.authService = AuthService
    this.notification = NotificationService
    this.validation = ValidationFactory
    this.storage = StorageService
    this.facebook = FacebookService
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
  save() {
    console.table(this.institution)
  }
  share() {
    /**
     * Ainda sem picture até definirmos qual imagem irá aparecer na publicação
     * Opções: logo da EVB, cover da instituição, imagem de perfil
     * No caso de cover ou perfil, verificar se será a cover padrão ou upada pelo user
     */
    this.facebook.share({
      href: this.location.absUrl(),
      title: this.institution.name,
      caption: this.institution.mission,
      description: this.institution.propose
    })
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
        let institution = response.data
        this.institution = institution
        this.institution.cover_position = 0
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
      this.rootScope.$broadcast('alert-clear')
      if (response && response.errors) {
        this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: response})
        this.location.hash('body')
        this.anchorScroll()
      }
    // }, error => {
    //   console.log(error)
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

PagePreview.$inject = ['$rootScope','$filter','$stateParams', '$sce', '$uibModal', '$location', '$anchorScroll','InstitutionService','ProfileService','AuthService','NotificationService','ValidationFactory','StorageService','FacebookService']