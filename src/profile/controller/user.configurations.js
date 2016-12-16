export default class UserConfigurations {
  constructor($filter, $rootScope, StorageService, ProfileService, ValidationFactory, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = ProfileService
    this.validation = ValidationFactory
    this.reader = new FileReader()
    this.needpassword = true
    this.load(profile)
  }
  load(profile) {
    profile = angular.copy(profile.data)
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.profile = profile
    this.needpassword = profile.needpassword
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
        this.storage.setItem('token', response.data.token)
        let {name, email, type, avatar, permissions} = response.data
        this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar, permissions: permissions})
        this.rootScope.$broadcast('profile.change')
        this.profile.password = '';
        this.profile.new_password = '';
        this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: 'Dados alterados com sucesso!'})
      }
    )
  }
  setPassword() {
    console.log(this.profile.needpassword && this.needpassword)
    this.needpassword = !this.needpassword
  }
}

UserConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'ValidationFactory', 'profile']