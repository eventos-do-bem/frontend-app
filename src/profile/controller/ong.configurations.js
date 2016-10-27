export default class OngConfigurations {
  constructor($filter, $rootScope, StorageService, ProfileService, InstitutionService, GeoLocationFactory, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = ProfileService
    this.institutionService = InstitutionService
    this.geolocation = GeoLocationFactory
    this.load(profile)
  }
  load(profile) {
    profile = angular.copy(profile.data)
    console.log(profile)
    let {uuid, name, cnpj, bank_account, coords, address, phone, areaActivity, facebook} = profile.institutions
    this.institution = {
      uuid: uuid,
      name: name,
      cnpj: cnpj,
      bank_account: bank_account,
      coords: coords,
      address: address,
      phone: phone,
      area_activity_uuid: areaActivity.uuid,
      facebook: facebook
    }
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.profile = profile
  }
  findAddressByPosition() {
    this.geolocation.getPosition(
      position => {
        this.institution.coords = `${position.coords.latitude}, ${position.coords.longitude}`
        this.geolocation.getAddress(position.coords)
          .then(response => this.institution.address = response.data.results[0].formatted_address)
      },
      error => console.error(error)
    )
  }
  saveOng(institution) {
    institution = angular.copy(institution)
    this.institutionService.update(institution)
      .then(response => console.log(response))
  }
  saveUser(profile) {
    profile = angular.copy(profile)
    delete profile.avatar
    console.log(profile)
    // birthdate = profile.birthdate.split('/')
    // profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    // profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
    this.service.change(profile)
      .then(
        response => {
          this.storage.setItem('token', response.data.token)
          let {name, email, type} = response.data
          this.storage.setItem('profile', {name: name, email: email, type: type})
          this.rootScope.$broadcast('profile.change')
          this.profile.password = '';
          this.profile.new_password = '';
        }
      )
  }
}

OngConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'InstitutionService', 'GeoLocationFactory', 'profile']