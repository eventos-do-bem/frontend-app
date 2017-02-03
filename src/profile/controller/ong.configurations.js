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
    this.service.change(profile, progress => {
      this.progress = progress
    }).then(
        response => {
          // this.storage.setItem('token', response.data.token)
          // let {name, email, type, avatar, permissions} = response.data
          // this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar, permissions: permissions})
          // this.rootScope.$broadcast('profile.change')
          this.service.setProfile(response.data)
          this.profile.password = '';
          this.profile.new_password = '';
        }
      )
  }
}

OngConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'InstitutionService', 'GeoLocationFactory', 'profile']