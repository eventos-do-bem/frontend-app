export default class UserConfigurations {
  constructor($filter, $rootScope, $location, $anchorScroll, StorageService, ProfileService, ValidationFactory, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.storage = StorageService
    this.service = ProfileService
    this.validation = ValidationFactory
    this.load(profile.data)
  }
  load(profile) {
    profile = angular.copy(profile)
    delete profile.phone
    delete profile.avatar
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    // profile.needpassword = true
    this.profile = profile
  }
  validateDate(field, date) {
    date = date.split('/')
    date = new Date(`${date[2]}-${date[1]}-${date[0]}`)
    if (!field.$error.mask) {
      let valid = (
        this.validation.dateMinByYears(date, 0) &&
        this.validation.dateMaxByYears(date, 121)
      )
      field.$setValidity('age', valid)
    }
  }
  save(profile) {
    this.service.change(profile, progress => {
      this.progress = progress
    }).then(
      response => {
        this.service.setProfile(response.data)
        // this.storage.setItem('token', response.data.token)
        // let {name, email, type, avatar, permissions} = response.data
        // this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar, permissions: permissions})
        // this.rootScope.$broadcast('profile.change')
        this.profile = response.data
        this.load(this.profile)
        this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: { message: 'Dados alterados com sucesso!' }})
        this.location.hash('body')
        this.anchorScroll()
      },
      error => {
        this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-exclamation', message: error.data})
        this.location.hash('body')
        this.anchorScroll()
      }
    )
  }
}

UserConfigurations.$inject = ['$filter', '$rootScope', '$location', '$anchorScroll', 'StorageService', 'ProfileService', 'ValidationFactory', 'profile']