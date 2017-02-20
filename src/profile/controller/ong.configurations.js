export default class OngConfigurations {
  constructor($filter, $rootScope, StorageService, ProfileService, Regex, InstitutionService, GeoLocationFactory, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = ProfileService
    this.urlPattern = Regex.URL
    this.institutionService = InstitutionService
    this.geolocation = GeoLocationFactory
    this.locationSupport = this.geolocation.checkSupport()
    this.locationError = false
    this.addressError = false
    this.load(profile)
  }
  load(profile) {
    profile = angular.copy(profile.data)
    profile.institution = profile.institutions
    profile.institution.area_activity_uuid = profile.institution.areaActivity.uuid
    delete profile.institutions
    // let {uuid, name, cnpj, bank_account, coords, address, phone, areaActivity, facebook} = profile.institutions
    // this.institution = {
    //   uuid: uuid,
    //   name: name,
    //   cnpj: cnpj,
    //   bank_account: bank_account,
    //   coords: coords,
    //   address: address,
    //   phone: phone,
    //   area_activity_uuid: areaActivity.uuid,
    //   facebook: facebook
    // }
    delete profile.avatar
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.profile = profile
  }
  findAddressByPosition() {
    this.geolocation.getPosition(
      position => {
        this.locationError = false
        this.profile.institution.coords = `${position.coords.latitude}, ${position.coords.longitude}`
        this.geolocation.getAddress(position.coords)
          .then(
            response => {
              this.addressError = false
              this.profile.institution.address = response.data.results[0].formatted_address
            },
            error => {
              this.addressError = true
            }
          )
      },
      error => this.locationError = true
    )
  }
  diffPassword(form, current, pass) {
    if (!this.profile.needpassword) {
      if (form[current].$valid && form[pass].$valid) {
        form[pass].$setValidity('diff', !(form[current].$viewValue == form[pass].$viewValue))
      } else if (form[current].$error.diff) {
        form[pass].$setValidity('diff', false)
      } else {
        form[current].$setValidity('diff', true)
        form[pass].$setValidity('diff', true)
      }
    }
  }
  saveOng(institution) {
    institution = angular.copy(institution)
    this.institutionService.update(institution)
      .then(
        response => {
          this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: { message: 'Dados da organização alterados com sucesso!' }})
        },
        error => {
          this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-exclamation', message: error.data})
        }
      )
  }
  saveUser(profile) {
    this.service.change(profile, progress => {
      this.progress = progress
    }).then(
        response => {
          response.data.institutions = profile.institution
          this.service.setProfile(response.data)
          delete this.profile.avatar
          this.profile.password = ''
          this.profile.new_password = ''
          this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: { message: 'Dados do responsável alterados com sucesso!' }})
        },
        error => {
          this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-exclamation', message: error.data})
        }
      )
  }
}

OngConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'Regex', 'InstitutionService', 'GeoLocationFactory', 'profile']